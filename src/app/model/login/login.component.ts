import { Component, OnInit, Input, NgModule } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { User } from '../../data/user';
import { LoginService } from '../../services/login.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

@NgModule({
  imports: [
    FormsModule,
    CommonModule
  ],
})

export class LoginComponent implements OnInit {

  @Input() user: User = new User();
  loggedIn: string = "false";

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private loginService: LoginService,
    private router: Router) { }

  ngOnInit() {
    this.loggedIn = localStorage.getItem("loggedIn");
  }

  
  goBack(): void {
    this.location.back();
  }

  login(): void {
    this.loginService.authenticate(this.user)
    .subscribe(
      (data) => {
        localStorage.setItem("token", data.token);
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("email", this.user.email);
      },
      (data) => {
          alert(data.error.message);
      },
      () => {
        this.router.navigate(['dashboard']);
      }
    );
  }

  logout(): void
  {
    localStorage.setItem("token", "0");
    localStorage.setItem("loggedIn", "false");
    localStorage.setItem("email","");
    this.router.navigate(['dashboard']);
  }
}
