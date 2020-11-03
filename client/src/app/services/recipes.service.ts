import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Recipe} from '../data/recipe';
import {Observable} from 'rxjs';

const URL = '/recipes';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  // TODO, change query params(?mealType=) as a some const or static value sth like: { queryParams: params }

  constructor(private http: HttpClient) { }

  postRecipe(recipe: FormData): Observable<any> {
    return this.http.post(URL, recipe);
  }
  findRecipeByMealType(type): Observable<Recipe[]>{
    // TODO
    return this.http.get<Recipe[]>(URL + `?mealType=${type}`);
  }
  findRecipeByName(name): Observable<boolean> {
    // TODO
    return this.http.get<boolean>( URL + `?name=${name}`);
  }
  findRecipeById(id): Observable<Recipe> {
    // TODO
    return this.http.get<Recipe>( URL + `?id=${id}`);
  }
  findAllRecipes(): Observable<Recipe[]>{
    return this.http.get<Recipe[]>(URL);
  }
  updateRecipeById(id, recipe: FormData): Observable<any>{
    return this.http.put(URL + `/${id}`, recipe);
  }
  deleteById(id): Observable<any>{
    return this.http.delete(URL + `/${id}`);
  }
}
