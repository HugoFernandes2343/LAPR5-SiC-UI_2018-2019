import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Category } from '../model/category';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  @Input() cat: Category;
  categories: Category[];

  constructor(
    private categoryService: CategoryService,
    private location: Location
  ) { 
    
  }

  ngOnInit() {
    this.displayList();
    this.initializeCategory();
  }
 
  displayList(): void {

    this.categoryService.getCategories()
      .subscribe(categories => this.categories = categories);
  }

  goBack(): void {
    this.location.back();
  }

  initializeCategory(): any {
    this.cat = new Category();
  }

  addCategory(): void {
    this.cat.name = this.cat.name.trim();
    if (!this.cat.name) { return; }
    
    this.cat.description = this.cat.description.trim();
    if (!this.cat.description) { return; }

    this.categoryService.addCategory(this.cat)
    .subscribe(() => window.location.reload());
  }

  delete(category: Category): void {
    this.categories = this.categories.filter(c => c !== category);
    this.categoryService.deleteCategory(category).subscribe();
  }

}
