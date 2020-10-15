package pl.recipeapp.server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.recipeapp.server.model.Recipe;
import pl.recipeapp.server.model.enums.MealType;
import pl.recipeapp.server.repositories.IngredientRepository;
import pl.recipeapp.server.repositories.RecipeRepository;


@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class RecipeController {

    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private IngredientRepository ingredientRepository;

    @PostMapping("/recipe")
    public Recipe saveRecipe(@RequestBody Recipe recipe){
        recipeRepository.save(recipe);
        ingredientRepository.saveAll(recipe.getIngredients());
        return recipe;
    }

    @GetMapping("/recipes")
    public Iterable<Recipe> getRecipes(){
        return recipeRepository.findAll();
    }

    @GetMapping("/recipes/{mealType}")
    public Iterable<Recipe> getRecipesByMealType(@PathVariable MealType mealType){
        return recipeRepository.findAllByMealType(mealType);
    }
    @GetMapping("/recipe/{name}")
    public Boolean isRecipeByNameExists(@PathVariable String name){
        return recipeRepository.existsByName(name);
    }

    @PutMapping("/recipe/{id}")
    public Recipe updateRecipe(@RequestBody Recipe recipe, @PathVariable long id){
        return recipeRepository.save(recipe);
    }
    @DeleteMapping("/recipe/{id}")
    public void deleteRecipeById(@PathVariable Long id){
        recipeRepository.deleteById(id);
    }
    
}
