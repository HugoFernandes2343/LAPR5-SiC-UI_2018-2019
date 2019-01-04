import { Component } from '@angular/core';
import { UsersService } from './users.service';
import { Router } from '@angular/router';
import { User } from './model/user';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  user: User;

  constructor(private usersService: UsersService, private router: Router, private idle: Idle) {

    idle.setIdle(300);
    idle.setTimeout(60);
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.onIdleEnd.subscribe();
    idle.onTimeout.subscribe(() => {
      this.user = this.usersService.getUser();

      if (this.user == null) {this.reset(); return; }

      this.usersService.logoutUser(this.user).subscribe(user => {
        if (user.message == "User Logout!") {
          this.usersService.setUser(null);
          this.router.navigate(['/login',]);
        } else {
          window.alert(user.message);
        }
      });
    });
    idle.onIdleStart.subscribe();
    idle.onTimeoutWarning.subscribe(() => { 
      this.user = this.usersService.getUser();
      if (this.user == null) {this.reset(); return; }
      this.router.navigate(['/timeout',]); 
    });

    this.reset();
  }

  reset() {
    this.idle.watch();
  }

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
