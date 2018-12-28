import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Finishing } from '../model/finishing';
import { FinishingService } from '../finishing.service';

@Component({
  selector: 'app-finishing',
  templateUrl: './finishing.component.html',
  styleUrls: ['./finishing.component.css']
})
export class FinishingComponent implements OnInit {
  @Input() finishing: Finishing;
  finishings: Finishing[];

  constructor(
    private finishingService: FinishingService,
    private location: Location
  ) {

  }

  ngOnInit() {
    this.displayList();
  }

  displayList(): void {

    this.finishingService.getFinishings()
      .subscribe(finishings => this.finishings = finishings);
  }

  goBack(): void {
    this.location.back();
  }

  delete(finishing: Finishing): void {
    this.finishings = this.finishings.filter(f => f !== finishing);
    this.finishingService.deleteFinishing(finishing).subscribe();
  }
}
