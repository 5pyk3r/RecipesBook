import {Component, OnInit} from '@angular/core';
import {Recipe} from '../data/recipe';
import {MatDialog} from '@angular/material/dialog';
import {RecipeDialogComponent} from '../recipe-dialog/recipe-dialog.component';
import {RecipesService} from '../services/recipes.service';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit{

  dataSource: Recipe[] = [];
  recipe: Recipe;

  constructor(public dialog: MatDialog,
              public recipeService: RecipesService) { }

  ngOnInit(): void {
    this.getRecipes();
  }

  openRecipeDialog() {
    const dialogRef = this.dialog.open(RecipeDialogComponent, {
      data: {}
    }).afterClosed().subscribe(response => this.getRecipes());
  }

  getRecipes(){
    this.recipeService.findAllRecipes().subscribe(data => this.dataSource = data);
  }
  editRecipe(recipe){
      this.dialog.open(RecipeDialogComponent, {
        data: {recipe}
      }).afterClosed().subscribe(response => this.getRecipes());
  }

  deleteRecipeById(id: number){
      this.recipeService.deleteById(id).subscribe(response => this.getRecipes());
  }

}
