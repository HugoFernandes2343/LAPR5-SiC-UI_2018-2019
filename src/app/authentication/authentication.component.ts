import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})

export class AuthenticationComponent implements OnInit {

  code: string;
  role: string;

  constructor(
    private usersService: UsersService,
    private router: Router
  ) { }

  ngOnInit() {
    this.code = this.usersService.getUser().code;
    this.role = this.usersService.getUser().role;
  }

  checkCode(inputCode: string): void {

    if (inputCode == this.code) {
      if (this.role == "Client") {
        this.router.navigate(['/SiC_it2']);
      } else if (this.role == "Delivery Manager") {
        this.router.navigate(['/SiC_it3']);
      } else {
        this.router.navigate(['/SiC_it1']);
      }
    } else {
      this.usersService.logoutUser(this.usersService.getUser()).subscribe(user => {
        window.alert("Wrong Code!");
        this.usersService.setUser(null);
        this.router.navigate(['/login']);
      });
    }

  }
}
