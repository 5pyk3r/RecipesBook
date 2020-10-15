import {Meal} from './enums/meal.enum';
import {Ingredient} from './ingredient';

export class Recipe {

  id: number = undefined;
  name: string;
  mealType: Meal = undefined;
  description: string = undefined;
  ingredients: Ingredient[];
}
