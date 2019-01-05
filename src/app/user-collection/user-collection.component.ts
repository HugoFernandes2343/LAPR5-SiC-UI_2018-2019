import {Component, Input, OnInit} from '@angular/core';
import {Collection} from "../model/collection";
import {CollectionService} from "../collection.service";
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import {UsersService} from "../users.service";

@Component({
  selector: 'app-user-collection',
  templateUrl: './user-collection.component.html',
  styleUrls: ['./user-collection.component.css']
})
export class UserCollectionComponent implements OnInit {

  @Input() collection: Collection;

  collections: Collection[];

  constructor(
      private collectionService: CollectionService,
      private location: Location,
      private router: Router,
      private usersService: UsersService) {
  }

  ngOnInit() {
    if(this.usersService.getUser() == null){
      this.router.navigate(['/login']);
    }
    this.displayList();
  }

  displayList(): void {
    this.collectionService.getCollections()
        .subscribe(collections => this.collections = collections);
  }

  goBack(): void {
    this.location.back();
  }

}
