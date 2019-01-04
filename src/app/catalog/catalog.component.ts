import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Catalog } from '../model/catalog';
import { CatalogService } from '../catalog.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  @Input() catalog: Catalog;

  catalogs: Catalog[];

  constructor(
    private catalogService: CatalogService,
    private location: Location
  ) { }

  ngOnInit() {
    this.displayList();
  }

  displayList(): void {
    this.catalogService.getCatalogs()
      .subscribe(catalogs => this.catalogs = catalogs);
  }

  goBack(): void {
    this.location.back();
  }

  delete(catalog: Catalog): void {
    this.catalogService.deleteCatalog(catalog).subscribe(() => window.location.reload());
  }

}
