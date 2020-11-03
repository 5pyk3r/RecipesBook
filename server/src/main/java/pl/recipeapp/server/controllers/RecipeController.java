package pl.recipeapp.server.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import pl.recipeapp.server.model.Ingredient;
import pl.recipeapp.server.model.Recipe;
import pl.recipeapp.server.model.enums.MealType;
import pl.recipeapp.server.repositories.IngredientRepository;
import pl.recipeapp.server.repositories.RecipeRepository;
import pl.recipeapp.server.services.AmazonS3BucketService;

import java.io.IOException;
import java.util.List;


@CrossOrigin(origins = "http://localhost:4200")
@RestController()
@RequestMapping("/recipes")
public class RecipeController {

    private RecipeRepository recipeRepository;
    private IngredientRepository ingredientRepository;
    private AmazonS3BucketService amazonS3BucketService;

    public RecipeController(RecipeRepository recipeRepository, IngredientRepository ingredientRepository, AmazonS3BucketService amazonS3BucketService) {
        this.recipeRepository = recipeRepository;
        this.ingredientRepository = ingredientRepository;
        this.amazonS3BucketService = amazonS3BucketService;
    }

    @PostMapping(path = "", consumes = "multipart/form-data")
    public String saveRecipe(@RequestParam("recipe") String data, @RequestPart("file") MultipartFile file) throws IOException {
        Recipe recipe = new ObjectMapper().readValue(data, Recipe.class);

        recipeRepository.save(recipe);
        ingredientRepository.saveAll(recipe.getIngredients());
        return this.amazonS3BucketService.uploadFile(file);
    }

    @GetMapping("")
    public Iterable<Recipe> getRecipes(){
        return recipeRepository.findAll();
    }

    @GetMapping(path = "", params = "mealType")
    public Iterable<Recipe> getRecipesByMealType(@RequestParam(value="mealType") MealType mealType){
        return recipeRepository.findAllByMealType(mealType);
    }

    @GetMapping(path = "", params = "name")
    public Boolean isRecipeByNameExists(@RequestParam(value="name") String name){
        return recipeRepository.existsByName(name);
    }

    @GetMapping(path = "", params = "id")
    public Recipe getRecipeById(@RequestParam(value="id") Long id){
        return recipeRepository.findRecipeById(id);
    }



    @PutMapping(path = "/{id}", consumes = "multipart/form-data")
    @Transactional
    public Recipe updateRecipe(@PathVariable Long id, @RequestParam("recipe") String data, @RequestBody MultipartFile file) throws IOException {
        Recipe recipe = new ObjectMapper().readValue(data, Recipe.class);

        List<Ingredient> ingredients = recipe.getIngredients();
//        ingredientRepository.deleteAllByRecipeId(id);
        ingredientRepository.saveAll(ingredients);

        if(file != null){
            amazonS3BucketService.uploadFile(file);
        }

        return recipeRepository.save(recipe);
    }

    @DeleteMapping("/{id}")
    public void deleteRecipeById(@PathVariable("id") Long id){
        Recipe recipe = recipeRepository.findRecipeById(id);
        amazonS3BucketService.deleteFileFromBucket(recipe.getFileName());
        recipeRepository.delete(recipe);
    }
}
