import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'BudgetTracker';
  isHomePage: boolean = false;
  isFormPage: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.isHomePage = event.url === '/';
        this.isFormPage = event.url.includes('/register') || event.url.includes('/login') || event.url.includes('/initial-setup') || event.url.includes('/welcome');
        this.scrollToTop();
      }
    });
  }

  ngOnInit(): void {}

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
