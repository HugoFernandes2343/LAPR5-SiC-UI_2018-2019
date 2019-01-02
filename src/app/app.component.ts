import { Component } from '@angular/core';
import { UsersService } from './users.service';
import { Router } from '@angular/router';
import { User } from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  user: User;

  constructor(
    private usersService: UsersService,
    private router: Router) { }

  logout(): void {

    this.user = this.usersService.getUser();

    if (this.user == null) { window.alert("First you must login as a User !"); return; }

    this.usersService.logoutUser(this.user).subscribe(user => {
      if (user.message == "User Logout!") {
        this.usersService.setUser(null);
        this.router.navigate(['/login',]);
      } else {
        window.alert(user.message);
      }
    });
  }

  delete(): void {

    this.user = this.usersService.getUser();

    if (this.user == null) { window.alert("First you must login as a User !"); return; }

    this.router.navigate(['/delete',]);
  }
}
