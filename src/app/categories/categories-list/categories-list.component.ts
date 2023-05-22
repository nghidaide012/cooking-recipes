import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecipeService } from 'src/app/recipe.service';
import { Categories, Recipes } from 'src/app/recipes';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css'],
  providers: [RecipeService]
})
export class CategoriesListComponent implements OnInit {
  categoriesList?: Categories[];
  categoryEdit!: Categories;
  addView = false;
  editView = false;
  errorMessage ='';
  constructor(private category: RecipeService){}
  
  ngOnInit():void {
    this.getCategories();
  }
  toggleAddView()
  {
    this.addView = false;
    this.errorMessage = '';
  }
  toggleButton() {
    this.addView = true;
    this.errorMessage = '';
  }
  getCategoryId(category: Categories)
  {
    this.categoryEdit = category;
  }
  toggleEdit() {
    this.editView = !this.editView;
    this.errorMessage = '';
  }
  toggleEditView()
  {
    this.toggleEdit();
  }
  getCategories(): void {
    this.category.getCategories().subscribe({
      next: (res: Categories[]) => {
        this.categoriesList = res;
      },
      error: (error) => console.log(error),
      complete: () => console.log("complete")
    });
  }
  saveCategory(categories: Categories)
  {
    const nameExists = this.categoriesList?.some((cat) => cat.name?.trim() === categories.name?.trim());
    if(nameExists)
    {
      this.errorMessage = 'this category already exists.';
    }
    else{
    this.category.saveCategory(categories).subscribe({
      next: (res) => {
        this.getCategories();
      },
      error: (error)=>console.log(error)
    });
    this.addView = false;
    this.errorMessage = '';
  }
  }
  updateCategory(category: Categories)
  {
    const nameExists = this.categoriesList?.some((cat) => cat.name?.trim() === category.name?.trim());
    if(nameExists)
    {
      this.errorMessage = 'this category already exists.';
    }
    else{
    this.category.editCategory(category).subscribe({
      next: (res) => {
        this.getCategories();
      },
      error: (error)=>console.log(error)
    });
    this.editView = false;
    this.errorMessage = '';
  }
  }
  deleteCategory(category: Categories) {
  
    this.category.deleteCategory(category).subscribe({
      next: (res) => {
        this.getCategories();
      },
      error: (error) => console.log(error)
    });
  }


}

