import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-sic-client-dashboard',
  templateUrl: './sic-client-dashboard.component.html',
  styleUrls: ['./sic-client-dashboard.component.css']
})
export class SicClientDashboardComponent implements OnInit {

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
