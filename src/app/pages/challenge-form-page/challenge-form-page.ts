import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-challenge-form-page',
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './challenge-form-page.html',
  styleUrl: './challenge-form-page.css',
})
export class ChallengeFormPage {}
