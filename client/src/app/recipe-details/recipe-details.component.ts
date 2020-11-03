import { Component, OnInit } from '@angular/core';
import {RecipesService} from '../services/recipes.service';
import {Recipe} from '../data/recipe';
import {ActivatedRoute, Router} from '@angular/router';
import { Location } from '@angular/common';
import {Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {RecipeDialogComponent} from '../recipe-dialog/recipe-dialog.component';
@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {

  public recipe: Recipe;
  subscription: Subscription;

  constructor(private recipeService: RecipesService,
              private route: ActivatedRoute,
              private location: Location,
              private router: Router,
              public dialog: MatDialog) { }


  ngOnInit(): void {
    this.getRecipe();
  }


  getRecipe(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.recipeService.findRecipeById(id)
      .subscribe(recipe => this.recipe = recipe);
  }

  goBack(): void {
    this.location.back();
  }

  editRecipe(): void{
    this.dialog.open(RecipeDialogComponent, {
      data: {recipe: this.recipe}
    }).afterClosed().subscribe(response => this.getRecipe());  }

  deleteRecipe(): void{
    this.recipeService.deleteById(this.recipe.id).subscribe(response => console.log(response));

    setTimeout(() => {
      this.router.navigate(['/']);
  }, 1000);
  }
}
