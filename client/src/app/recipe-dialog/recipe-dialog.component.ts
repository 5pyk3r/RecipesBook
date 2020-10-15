import { Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Recipe} from '../data/recipe';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {RecipesService} from '../services/recipes.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Meal} from '../data/enums/meal.enum';
import {Ingredient} from '../data/ingredient';

@Component({
  selector: 'app-recipe-dialog',
  templateUrl: './recipe-dialog.component.html',
  styleUrls: ['./recipe-dialog.component.css']
})
export class RecipeDialogComponent implements OnInit {

  public recipe: Recipe;
  public recipeForm: FormGroup;
  selectedMealType: Meal;
  mealsValues = Object.keys;
  mealTypes: typeof Meal = Meal;

  ingredients: Ingredient[] = [];

  constructor(private dialogRef: MatDialogRef<RecipeDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any,
              private recipeService: RecipesService) {
    this.recipe = data.recipe;
  }

  ngOnInit(): void {
    this.recipeForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      mealType: new FormControl('', [Validators.required])
    });
    this.recipeForm.get('name');
    // this.recipeForm.get('description').setValue(this.recipe?.description);
    // this.recipeForm.get('mealType').setValue(this.recipe?.mealType);
    // this.recipeForm.get('ingredients').setValue(this.recipe?.ingredients);
  }

  // getEnumKeyByEnumValue(myEnum, enumValue) {
  //   let keys = Object.keys(myEnum).filter(x => myEnum[x] === enumValue);
  //   return keys.length > 0 ? keys[0] : null;
  // }

  getIngredients(ingredients2){
    this.ingredients = ingredients2;
  }

  close(){
    this.dialogRef.close();
  }

  save() {
    const recipe = new Recipe();

    recipe.name = this.recipeForm.controls.name.value;
    recipe.description = this.recipeForm.controls.description.value;
    recipe.mealType = this.recipeForm.controls.mealType.value;
    recipe.ingredients = this.ingredients;

    if (this.recipe === undefined){
      this.recipeService.findRecipeByName(recipe.name).subscribe(isExist => {
      if (isExist === false) {
        this.recipeService.postRecipe(recipe).subscribe(response => {
          this.dialogRef.close(response);
        }, (error: HttpErrorResponse) => {
          console.log(error.message + ' error:');
        });
      }
      else{
        //////
        console.log("There is recipe, already exists");
      }
    });
    } else{
      recipe.id = this.recipe.id;

      this.recipeService.updateRecipeById(this.recipe.id, recipe).subscribe(response =>
        this.dialogRef.close(response));
    }
    // this.dialogRef.close();

  }

}
