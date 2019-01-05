import {Component, OnInit, Input} from '@angular/core';
import {Location} from '@angular/common';
import {Collection} from '../model/collection';
import {CollectionService} from "../collection.service";
import {Router} from '@angular/router';
import {UsersService} from '../users.service';

@Component({
    selector: 'app-collection',
    templateUrl: './collection.component.html',
    styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {

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

    delete(collection: Collection): void {
        this.collectionService.deleteCollection(collection)
            .subscribe(() => window.location.reload());
    }
}
