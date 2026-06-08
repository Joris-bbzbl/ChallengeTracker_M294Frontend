import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AppAuthService } from '../../services/app-auth.service';

@Component({
  selector: 'app-login-page',
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {
  constructor(private appAuthService: AppAuthService) {}

  login() {
    console.log('Login button clicked');
    this.appAuthService.login();
  }
}
