import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-si-c-cm-dashboard',
  templateUrl: './si-c-cm-dashboard.component.html',
  styleUrls: ['./si-c-cm-dashboard.component.css']
})
export class SiCCMDashboardComponent implements OnInit {

  constructor(
    private usersService: UsersService,
    private router: Router
  ) { }

  ngOnInit() {
    if(this.usersService.getUser() == null){
      this.router.navigate(['/login']);
    }
  }
}
