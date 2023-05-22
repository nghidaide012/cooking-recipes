import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RecipeService } from 'src/app/recipe.service';
import { Categories } from 'src/app/recipes';

@Component({
  selector: 'app-create-categories',
  templateUrl: './create-categories.component.html',
  styleUrls: ['./create-categories.component.css'],
  providers:[RecipeService]
})
export class CreateCategoriesComponent{
  category!: Categories;

  categoryForm!: FormGroup;
  @Output()
  saveCategoryEvent: EventEmitter<Categories> = new EventEmitter();
  @Output()
  toggleAddViewEvent: EventEmitter<boolean> = new EventEmitter();

  categoryName = new FormControl('', [Validators.required, this.whitespaceValidator]);
  constructor(fb: FormBuilder,private recipe: RecipeService)
  {
    this.categoryForm = fb.group({
      categoryName: this.categoryName
    });
  }

  toggleView()
  {
    this.toggleAddViewEvent.emit();
  }
  addCategory()
  {
    this.saveCategoryEvent.emit(this.createCategoryObject(this.categoryForm));
    this.categoryForm.reset();
  }
  whitespaceValidator(control: FormControl): { [key: string]: boolean } | null {
    const value = control.value;
    if (value && value.trim().length === 0) {
      return { 'whitespace': true };
    }
    return null;
  }
  private createCategoryObject(form: FormGroup)
  {
    const categoryObject: Categories = {
      name: form.value.categoryName.trim()
    }
    return categoryObject;
  }
}
