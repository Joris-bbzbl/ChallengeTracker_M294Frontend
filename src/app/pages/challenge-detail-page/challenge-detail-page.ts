import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-challenge-detail-page',
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './challenge-detail-page.html',
  styleUrl: './challenge-detail-page.css',
})
export class ChallengeDetailPage {}
