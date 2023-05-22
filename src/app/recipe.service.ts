import { Injectable } from '@angular/core';
import { Recipes, Categories } from './recipes';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipeUrl = 'http://localhost:3000/recipes';
  private categoriesUrl = 'http://localhost:3000/categories';

  constructor(private httpClient: HttpClient){}

  saveRecipe(recipe: Recipes): Observable<Recipes>
  {
    const url = `${this.recipeUrl}`;
    return this.httpClient.post<Recipes>(url, recipe);
  }
  getRecipes(): Observable<Recipes[]>
  {
    const url = `${this.recipeUrl}`;
    return this.httpClient.get<Recipes[]>(url);
  }
  getRecipesById(recipeId: string): Observable<Recipes>
  {
    const url = `${this.recipeUrl}/${recipeId}`;
    return this.httpClient.get<Recipes>(url);
  }
  editRecipe(recipe: Recipes): Observable<Recipes>
  {
    const url = `${this.recipeUrl}/${recipe.id}`;
    return this.httpClient.put<Recipes>(url, recipe);
  }
  deleteRecipe(recipe: Recipes): Observable<Recipes>
  {
    const url = `${this.recipeUrl}/${recipe.id}`;
    return this.httpClient.delete(url);
  }

  saveCategory(categories: Categories): Observable<Categories>
  {
    const url = `${this.categoriesUrl}`;
    return this.httpClient.post<Categories>(url, categories);
  }
  getCategories(): Observable<Categories[]>
  {
    const url = `${this.categoriesUrl}`;
    return this.httpClient.get<Categories[]>(url);
  }
  
  editCategory(categories: Categories): Observable<Categories>
  {
    const url = `${this.categoriesUrl}/${categories.id}`;
    return this.httpClient.put<Categories>(url, categories);
  }
  deleteCategory(categories: Categories): Observable<Categories>
  {
    const url = `${this.categoriesUrl}/${categories.id}`;
    return this.httpClient.delete(url);
  }
}
