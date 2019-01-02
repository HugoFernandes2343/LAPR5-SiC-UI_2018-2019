import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';
import { User } from '../user';
import { Location } from '@angular/common';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  user: User;

  constructor(
    private usersService: UsersService,
    private router: Router,
    private location: Location) { }

  ngOnInit() {
    this.user = this.usersService.getUser();
  }

  yesDelete() : void {

    this.usersService.checkInputUsername(this.user.username).subscribe(user => {
      if (user.message == "User Deleted!") {
        this.usersService.setUser(null);
        this.router.navigate(['/login',]);
      } else {
        window.alert(user.message);
        this.location.back();
      }
    });

  }

  noDelete() : void {
    this.location.back();
  }
}