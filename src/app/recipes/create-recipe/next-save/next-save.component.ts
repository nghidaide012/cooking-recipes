import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RecipeService } from 'src/app/recipe.service';
import { Recipes } from 'src/app/recipes';
@Component({
  selector: 'app-next-save',
  templateUrl: './next-save.component.html',
  styleUrls: ['./next-save.component.css']
})
export class NextSaveComponent implements OnInit{
  
  @Input()
  recipeForm!: FormGroup;
  detailForm!: FormGroup;
  itemsArray!: FormArray;
  stepsArray!: FormArray;
  ingreNum!: number;
  stepNum!: number;
  @Output()
  goBackEvent: EventEmitter<boolean> = new EventEmitter();

  constructor(fb: FormBuilder,private recipe: RecipeService, private router: Router){
    this.detailForm = fb.group({
      items: fb.array([]),
      steps: fb.array([])
    });
    this.itemsArray = this.detailForm.get('items') as FormArray;
    this.stepsArray = this.detailForm.get('steps') as FormArray;
  }
  ngOnInit(): void {
    console.log(this.recipeForm);
    this.ingreNum = this.recipeForm.value.ingredientNum;
    this.stepNum = this.recipeForm.value.stepNum;
    for(let i = 0; i < this.ingreNum; i++)
    {
      this.itemsArray.push(this.createFormControl());
    }
    for(let i = 0; i < this.stepNum; i++)
    {
      this.stepsArray.push(this.createFormControl());
    }
    
  }
  toggleGoBack()
  {
    this.goBackEvent.emit();
  }
  whitespaceValidator(control: FormControl): { [key: string]: boolean } | null {
    const value = control.value;
    if (value && value.trim().length === 0) {
      return { 'whitespace': true };
    }
    return null;
  }
  createFormControl(): FormControl {
    return new FormControl('', [Validators.required, this.whitespaceValidator]);
  }

  addRecipe()
  {
    this.recipe.saveRecipe({
      name: this.recipeForm.value.recipeName,
      image: this.recipeForm.value.image,
      description: this.recipeForm.value.describe,
      categoryId: this.recipeForm.value.category,
      methods: this.detailForm.value.steps,
      ingredients: this.detailForm.value.items
    }).subscribe({
      next: (res: Recipes) => {
        console.log(res);
        this.router.navigate(['/recipes']);
      },
      error: (error) => console.log(error),
    });
  }
}
