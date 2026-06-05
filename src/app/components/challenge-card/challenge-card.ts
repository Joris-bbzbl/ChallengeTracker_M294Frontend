import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-challenge-card',
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './challenge-card.html',
  styleUrl: './challenge-card.css',
})
export class ChallengeCard {}
