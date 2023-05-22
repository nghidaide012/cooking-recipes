import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesListComponent } from './categories/categories-list/categories-list.component';
import { CreateRecipeComponent } from './recipes/create-recipe/create-recipe.component';
import { RecipesListComponent } from './recipes/recipes-list/recipes-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';

const routes: Routes = [
  {
    path: 'categories',
    component: CategoriesListComponent
  },
  {
    path: 'recipes/create',
    component: CreateRecipeComponent
  },
  {
    path: 'recipes',
    component: RecipesListComponent
  },
  {
    path: 'recipes/details/:id',
    component: RecipeDetailComponent
  },
  {
    path: '**',
    redirectTo: '/recipes',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
