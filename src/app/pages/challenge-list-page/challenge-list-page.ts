import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-challenge-list-page',
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './challenge-list-page.html',
  styleUrl: './challenge-list-page.css',
})
export class ChallengeListPage {}
