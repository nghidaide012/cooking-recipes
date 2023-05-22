import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecipeService } from 'src/app/recipe.service';
import { Categories, Recipes } from 'src/app/recipes';


@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {
  recipeList!: Recipes[];
  categoryList!: Categories[];

  constructor(private recipes: RecipeService){}

  ngOnInit(): void {
    this.recipes.getRecipes().subscribe({
      next: (res) => {
        this.recipeList = res;
      },
      error: (error) => console.log(error)
    });
    this.recipes.getCategories().subscribe({
      next: (res) => {
        this.categoryList = res;
      },
      error: (error) => console.log(error)
    })
  }
  getCategoryName(categoryID?: number){
    const category = this.categoryList?.find((cat) => cat.id === categoryID);
    return category?.name;
  }
  filterRecipe(categoryID?: number)
  {
    if(categoryID === 0)
    {
      this.recipes.getRecipes().subscribe({
        next: (res) => {
          this.recipeList = res;
        },
        error: (error) => console.log(error)
      });
    }
    else
    {
      this.recipeList = [];
      this.recipes.getRecipes().subscribe({
        next: (res) => {
          res.forEach((item) => {
            if(item.categoryId === categoryID)
            {
              this.recipeList.push(item);
            }
          })
        },
        error: (error) => console.log(error)
      });
    }
  }


}
