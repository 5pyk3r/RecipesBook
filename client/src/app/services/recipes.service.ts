import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Recipe} from '../data/recipe';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  private url = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  postRecipe(recipe: Recipe){
    return this.http.post(this.url + '/recipe', recipe);
  }
  findRecipeByMealType(type): Observable<Recipe[]>{
    return this.http.get<Recipe[]>(this.url + `/recipes/${type}`);
  }
  findRecipeByName(name): Observable<boolean> {
    return this.http.get<boolean>(this.url + `/recipe/${name}`);
  }
  findAllRecipes(): Observable<Recipe[]>{
    return this.http.get<Recipe[]>(this.url + '/recipes');
  }
  updateRecipeById(id, recipe){
    return this.http.put(this.url + `/recipe/${id}`, recipe);
  }

  deleteById(id){
    return this.http.delete(this.url + `/recipe/${id}`);
  }
}
