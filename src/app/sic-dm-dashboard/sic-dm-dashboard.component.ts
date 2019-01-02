import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-sic-dm-dashboard',
  templateUrl: './sic-dm-dashboard.component.html',
  styleUrls: ['./sic-dm-dashboard.component.css']
})
export class SicDmDashboardComponent implements OnInit {

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
