import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(
    private location: Location,
    private router: Router, 
  ) { }

  ngOnInit() {
  }

  goBack(): void {
    this.router.navigate(['/SiC_it2',]);
  }
}