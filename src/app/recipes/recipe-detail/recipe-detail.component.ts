import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from 'src/app/recipe.service';
import { Recipes } from 'src/app/recipes';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit{

  selectedRecipe!: Recipes;

  constructor(private recipe: RecipeService,private route: ActivatedRoute, private router: Router){}

  ngOnInit(): void {
    const recipeId = this.route.snapshot.paramMap.get('id');
    this.recipe.getRecipesById(recipeId!).subscribe({
      next: (res) => {
        this.selectedRecipe = res;
        console.log(this.selectedRecipe);
      },
      error: (error) => console.log(error)
    });
  }
  deleteRecipe(){
    this.recipe.deleteRecipe(this.selectedRecipe).subscribe(() => {
      this.router.navigate(['/recipes']);
    });
  }
}
