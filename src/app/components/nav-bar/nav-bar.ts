import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AppAuthService } from '../../services/app-auth.service';

@Component({
  selector: 'app-nav-bar',
  imports: [CommonModule, RouterModule, MatToolbarModule, MatButtonModule],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
})
export class NavBar {
  constructor(public authService: AppAuthService) {}

  login(): void {
    this.authService.login();
  }

  logout(): void {
    this.authService.logout();
  }
}
