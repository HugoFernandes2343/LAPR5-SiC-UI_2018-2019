import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CategoryService } from '../category.service';
import { Category } from '../model/category';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnInit {
  @Input() category: Category;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getCategory();
  }

  getCategory(): void {
    const id = +this.route.snapshot.paramMap.get('categoryId');
    this.categoryService.getCategory(id)
      .subscribe(category => this.category = category);
  }

  save(): void {
    this.categoryService.updateCategory(this.category)
      .subscribe(() => window.location.reload());
  }

  goBack(): void {
    this.location.back();
  }

}
