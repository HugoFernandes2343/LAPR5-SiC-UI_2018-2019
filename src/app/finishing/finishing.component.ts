import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Finishing } from '../model/finishing';
import { FinishingService } from '../finishing.service';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-finishing',
  templateUrl: './finishing.component.html',
  styleUrls: ['./finishing.component.css']
})
export class FinishingComponent implements OnInit {
  @Input() fin: Finishing;
  finishings: Finishing[];

  constructor(
    private finishingService: FinishingService,
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
    this.initializeFinishing();
  }

  displayList(): void {

    this.finishingService.getFinishings()
      .subscribe(finishings => this.finishings = finishings);
  }

  initializeFinishing(): any {
    this.fin= new Finishing();
  }

  save(): void {
    this.fin.name = this.fin.name.trim();
    if (!this.fin.name) { return; }

    this.fin.description = this.fin.description.trim();
    if (!this.fin.description) { return; }

    this.finishingService.addFinishing(this.fin).subscribe(() => window.location.reload());
  }

  reset(): void {
    window.location.reload();
  }

  goBack(): void {
    this.location.back();
  }

  delete(finishing: Finishing): void {
    this.finishings = this.finishings.filter(f => f !== finishing);
    this.finishingService.deleteFinishing(finishing).subscribe();
  }
}
