import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';
import { User } from '../user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private usersService: UsersService,
    private router: Router) { }

  ngOnInit() {
  }

  goBack(): void {
    this.router.navigate(['/login']);
  }

  register(username: string, email: string, role: string, password: string, confirmPassword: string): void {

    username = username.trim();
    email = email.trim();
    role = role.trim();
    password = password.trim();
    confirmPassword = confirmPassword.trim();

    if (username == '' || username == null) { window.alert('Username is empty or null!'); return };
    if (email == '' || email == null) { window.alert('Email is empty or null!'); return };
    if (role == '' || role == null) { window.alert('Role is empty or null!'); return };
    if (password == '' || password == null) { window.alert('Password is empty or null!'); return };
    if (confirmPassword == '' || confirmPassword == null) { window.alert('Please confirm your password!'); return };

    if ( role != "Client" && role != "Content Manager" && role != "Delivery Manager") { window.alert('Invalid Role!'); return };

    if ( confirmPassword != password) { window.alert('Passwords Dont Match !'); return };

    this.usersService.checkCredentials({username,password,email,role} as User).subscribe(user => {
      if (user.message == "ok") {
        this.router.navigate(['/login',]);
      } else {
        window.alert(user.message);
      }
    });
  }

}