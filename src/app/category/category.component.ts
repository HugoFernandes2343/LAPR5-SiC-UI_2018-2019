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
  @Input() category: Category;
  categories: Category[];

  constructor(
    private categoryService: CategoryService,
    private location: Location
  ) { 
    
  }

  ngOnInit() {
    this.displayList();
  }

  displayList(): void {

    this.categoryService.getCategories()
      .subscribe(categories => this.categories = categories);
  }

  goBack(): void {
    this.location.back();
  }

  delete(category: Category): void {
    this.categories = this.categories.filter(c => c !== category);
    this.categoryService.deleteCategory(category).subscribe();
  }

}
