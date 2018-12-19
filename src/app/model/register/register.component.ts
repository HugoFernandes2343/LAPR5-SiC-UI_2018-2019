import { Component, OnInit, Input, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { User } from '../../data/user';
import { LoginService } from '../../services/login.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

@NgModule({
  imports: [
    FormsModule,
    CommonModule
  ],
})

export class RegisterComponent implements OnInit {

  @Input() user: User = new User();

  constructor(private loginService: LoginService,
    private location: Location,
    private router: Router) { }
  

  ngOnInit() {
  }

 goBack(): void {
    this.location.back();
  }

  register(): void {
    this.loginService.register(this.user)
    .subscribe(
      () => {
        this.router.navigate(['dashboard']);
      },
      (data) => {
        alert(data.error.message);
      }
    );
  }
}
