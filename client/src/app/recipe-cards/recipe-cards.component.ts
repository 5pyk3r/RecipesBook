import {Component, OnInit} from '@angular/core';
import {RecipeDialogComponent} from '../recipe-dialog/recipe-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {RecipesService} from '../services/recipes.service';
import {Recipe} from '../data/recipe';


@Component({
  selector: 'app-recipe-cards',
  templateUrl: './recipe-cards.component.html',
  styleUrls: ['./recipe-cards.component.css']
})
export class RecipeCardsComponent implements OnInit {

  mealType: string;
  dataSource: Recipe[] = [];
  recipe: Recipe;

  constructor(public dialog: MatDialog,
              public recipeService: RecipesService) { }

  ngOnInit(): void {
    this.getAllRecipes();
  }

  filterRecipeOption(value: string){
    this.mealType = value;
    if(value === 'ALL'){
      this.getAllRecipes();
    }else{
      this.recipeService.findRecipeByMealType(this.mealType).subscribe(data => this.dataSource = data);
    }
  }

  openRecipeDialog() {
    const dialogRef = this.dialog.open(RecipeDialogComponent, {
      data: {}
    }).afterClosed().subscribe(response => this.getAllRecipes());
  }

  getAllRecipes(){
    this.recipeService.findAllRecipes().subscribe(data => this.dataSource = data);
  }

  deleteRecipeById(id: number){
    this.recipeService.deleteById(id).subscribe(response => this.getAllRecipes());
  }
}
