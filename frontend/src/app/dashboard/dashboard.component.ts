import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userId!: number;
  welcomeMessage: string = ''; 
  userInfo: any; 

  constructor(private userService: UserService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.userId = +params['userId'];
    });
    this.fetchUserData();
  }

  fetchUserData() {
    this.userService.getUserData(this.userId).subscribe(userData => {
      this.userInfo = userData;
      this.welcomeMessage = `Hi, ${userData.username}!`;
    }, error => {
      console.error('Error fetching user data:', error);
    });
  }
}
