import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private usersService: UsersService,
    private router: Router) { }

  ngOnInit() {
  }

  login(username: string, password: string): void {
    
    username = username.trim();
    password = password.trim();

    if (username == '' || username == null) { window.alert('Username is empty or null!'); return };
    if (password == '' || password == null) { window.alert('Password is empty or null!'); return };

    this.usersService.searchUser(username, password).subscribe(user => {
      if (user.message == "ok") {
        this.usersService.setUser(user);
        this.router.navigate(['/authentication',]);
      } else {
        window.alert(user.message);
      }
    });

  }

}
