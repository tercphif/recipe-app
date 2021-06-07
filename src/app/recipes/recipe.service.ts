import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Recipe } from 'src/app/recipes/recipe.model';
import { Ingredient } from '../sharing/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  //private recipes: Recipe[] = [
  //  new Recipe(
  //    'Pan Seared Steak',
  //    'A medium rare sirloin with garlic butter and herbs',
  //    'https://cookingpotsnpans.com/wp-content/uploads/2020/09/london-broil.jpg',
  //    [
  //      new Ingredient('Steak', 1),
  //      new Ingredient('Butter', 1),
  //      new Ingredient('Garlic', 2),
  //      new Ingredient('Rosemary', 6)
  //    ]),
  //  new Recipe(
  //    'Pizza Casserole',
  //    'Pan made and extra cheesy - This casserole is delicious',
  //    'https://joyfoodsunshine.com/wp-content/uploads/2016/09/easy-pizza-casserole-recipe-4-500x500.jpg',
  //    [
  //      new Ingredient('Cheese', 3),
  //      new Ingredient('Pepperoni', 20),
  //      new Ingredient('Pizza Dough', 1)
  //    ])
  //];
  private recipes: Recipe[] = [];

  constructor(private slService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
