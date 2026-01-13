import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, RouterOutlet, RouterLink } from '@angular/router';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule, RouterOutlet, RouterLink, UpperCasePipe],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  sidebarOpen = signal(true);
  public username = '';
  public role = '';

  constructor(private router: Router) {}

  ngOnInit() {
    // Get username from localStorage (set during login)
    const localStorageData = localStorage.getItem('leaveUser');
    if(localStorageData != null) {
      const userObj = JSON.parse(localStorageData);
      this.username = userObj.userName;
      this.role = userObj.role;
    }
  }

  toggleSidebar() {
    this.sidebarOpen.update((value) => !value);
  }

  logout() {
    // Clear authentication data
    localStorage.removeItem('leaveUser');
    console.log('User logged out', this.username);
    // Navigate to login
    this.router.navigate(['/login']);
  }
}
