import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RecipeService } from 'src/app/recipe.service';
import { Categories } from 'src/app/recipes';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css'],
  providers: [RecipeService]
})
export class CategoryEditComponent implements OnInit {
  
  @Input()
  category!: Categories;
  
  CategoryEditForm!: FormGroup;
  categoryName = new FormControl('', [Validators.required, this.whitespaceValidator]);

  constructor(private fb: FormBuilder){}

  ngOnInit(): void {
    this.CategoryEditForm = this.fb.group({
      categoryName: this.categoryName
    })
    this.CategoryEditForm.get('categoryName')?.setValue(this.category.name);
    console.log(this.category);
  }

  @Output()
  toggleEditViewEvent: EventEmitter<boolean> = new EventEmitter();
  @Output()
  updateCategoryEvent: EventEmitter<Categories> = new EventEmitter();
  
  whitespaceValidator(control: FormControl): { [key: string]: boolean } | null {
    const value = control.value;
    if (value && value.trim().length === 0) {
      return { 'whitespace': true };
    }
    return null;
  }
  updateCategory()
  {
    this.updateCategoryEvent.emit(this.createCategoryObject(this.CategoryEditForm));
    this.CategoryEditForm.reset();
  }
  toggleEdit()
  {
    this.toggleEditViewEvent.emit();
  }
  private createCategoryObject(form: FormGroup)
  {
    const categoryObject: Categories = {
      id: this.category.id,
      name: form.value.categoryName.trim()
    }
    return categoryObject;
  }

}
