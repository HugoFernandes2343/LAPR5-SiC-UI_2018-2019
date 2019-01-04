import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Combination } from '../model/combination';
import { CombinationService } from '../combination.service';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-combination',
  templateUrl: './combination.component.html',
  styleUrls: ['./combination.component.css']
})
export class CombinationComponent implements OnInit {

  @Input() combination: Combination;
  @Input() containingProduct: string;
  @Input() containedProduct: string;
  @Input() required: boolean;
  combinations: Combination[];

  constructor(
    private combinationService: CombinationService,
    private location: Location,
    private router: Router, 
    private usersService: UsersService
  ) {

  }

  ngOnInit() {
    if(this.usersService.getUser() == null){
      this.router.navigate(['/login']);
    }
    this.displayList();
  }

  displayList(): void {

    this.combinationService.getCombinations()
      .subscribe(combinations => this.combinations = combinations);
  }

  addCombination(): void {
    this.combination=new Combination;
    this.containingProduct = this.containingProduct.trim();
    this.containedProduct = this.containedProduct.trim();
    if (!this.containedProduct ) { return; }
    if (!this.containingProduct ) { return; }
    this.combination.containingProduct=this.containingProduct;
    this.combination.containedProduct=this.containedProduct;
    this.combination.required=this.required;
    this.combinationService.addCombination(this.combination)
    .subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

  delete(combination: Combination): void {
    this.combinations = this.combinations.filter(c => c !== combination);
    this.combinationService.deleteCombination(combination).subscribe();
  }
}
