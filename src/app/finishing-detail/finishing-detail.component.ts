import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Finishing } from '../model/finishing';
import { FinishingService } from '../finishing.service';

@Component({
  selector: 'app-finishing-detail',
  templateUrl: './finishing-detail.component.html',
  styleUrls: ['./finishing-detail.component.css']
})
export class FinishingDetailComponent implements OnInit {
  @Input() finishing: Finishing;
  finishings: Finishing[];

  constructor(
    private route: ActivatedRoute,
    private finishingService: FinishingService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getFinishing();
  }

  getFinishing(): void {
    const id = +this.route.snapshot.paramMap.get('finishingId');
    this.finishingService.getFinishing(id)
      .subscribe(finishing => this.finishing = finishing);
  }

  reset(): void {
    window.location.reload();
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.finishingService.updateFinishing(this.finishing)
      .subscribe(() => window.location.reload());
  }
}