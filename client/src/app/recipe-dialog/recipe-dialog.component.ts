import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Recipe} from '../data/recipe';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {RecipesService} from '../services/recipes.service';
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
  currentFileUpload: File;
  recipeIngredients: Ingredient[] = [];
  alreadyExists: boolean;

  constructor(private dialogRef: MatDialogRef<RecipeDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any,
              private recipeService: RecipesService) {
    this.recipe = data.recipe;
  }

  ngOnInit(): void {
    this.recipeForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
      description: new FormControl('', [Validators.required]),
      mealType: new FormControl('', [Validators.required]),
      fileName: new FormControl('',[Validators.required])
    });

    this.recipeForm.get('name').setValue(this.recipe?.name);
    this.recipeForm.get('description').setValue(this.recipe?.description);
    this.recipeForm.get('mealType').setValue(this.recipe?.mealType);
    this.recipeForm.get('fileName').setValue(this.recipe?.fileName);
  }

  getIngredients(ingredients){
    this.recipeIngredients = ingredients;
  }

  close(){
    this.dialogRef.close();
  }
  selectFile(file){
    this.currentFileUpload = file.target.files[0];
  }

  save() {
    const formData = new FormData();

    const recipe: any = {
      id: this.recipe?.id,
      name : this.recipeForm.controls.name.value,
      description: this.recipeForm.controls.description.value,
      mealType: this.recipeForm.controls.mealType.value,
      ingredients: this?.recipeIngredients,
      fileName: this.currentFileUpload?.name
    };

    if (this.recipe != null && this.currentFileUpload == null){
      recipe.fileName = this.recipe.fileName;
    }

    formData.append('recipe', JSON.stringify(recipe));

    if (this.currentFileUpload != null){
      formData.append('file', this.currentFileUpload, this.currentFileUpload.name);
    }

    if (this.recipe === undefined){
      this.recipeService.findRecipeByName(recipe.name).subscribe(isExist => {
      if (isExist === false && this.currentFileUpload != null) {
        this.recipeService.postRecipe(formData).subscribe(response => {
          this.dialogRef.close(response);
          this.recipeService.findAllRecipes();
        });
        this.dialogRef.close();
      }
      else{
        this.alreadyExists = true;
      }
    });
    } else{

      recipe.id = this.recipe.id;

      this.recipeService.updateRecipeById(this.recipe.id, formData).subscribe(response =>
        this.dialogRef.close(response));
    }
  }
}
