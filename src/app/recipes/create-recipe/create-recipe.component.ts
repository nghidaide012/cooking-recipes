import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RecipeService } from 'src/app/recipe.service';
import { Recipes, Categories } from 'src/app/recipes';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.css'],
  providers: [RecipeService]
})
export class CreateRecipeComponent implements OnInit {
  categoriesList!: Categories[];
  recipeList!: Recipes[];

  recipeForm!: FormGroup;

  nextPage = false;
  errorMessage ='';

  recipeName = new FormControl('', [Validators.required, this.whitespaceValidator]);
  category = new FormControl('', Validators.required);
  describe = new FormControl('', [Validators.required, this.whitespaceValidator]);
  image = new FormControl(null, [Validators.required, this.whitespaceValidator]);
  ingredientNum = new FormControl('', Validators.required);
  stepNum = new FormControl('', Validators.required);


  constructor(private recipes: RecipeService, fb: FormBuilder){
    this.recipeForm = fb.group({
      recipeName: this.recipeName,
      category: this.category,
      describe: this.describe,
      image: this.image,
      ingredientNum: this.ingredientNum,
      stepNum: this.stepNum
    });
  }
  ngOnInit(): void {
    this.getCategories();
    this.recipes.getRecipes().subscribe({
      next: (res) => {
        this.recipeList = res;
      },
      error: (error) => console.log(error)
    });
  }
  getCategories(): void {
    this.recipes.getCategories().subscribe({
      next: (res: Categories[]) => {
        this.categoriesList = res;
      },
      error: (error) => console.log(error),
      complete: () => console.log("complete")
    });
  }
  whitespaceValidator(control: FormControl): { [key: string]: boolean } | null {
    const value = control.value;
    if (value && value.trim().length === 0) {
      return { 'whitespace': true };
    }
    return null;
  }
  nextForm()
  {
   // const nameExists = this.categoriesList?.some((cat) => cat.name?.trim() === categories.name?.trim());
    const nameExists = this.recipeList?.some((rep) => rep.name?.trim() === this.recipeForm.value.recipeName.trim());
    if(nameExists)
    {
      this.errorMessage = "This recipe already existed!";
    }
    else
    {
    this.nextPage = !this.nextPage;
    }
  }
  goBack()
  {
    this.nextForm();
    this.errorMessage = '';
  }

  

}
