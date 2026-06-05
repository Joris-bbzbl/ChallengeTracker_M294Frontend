import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Challenge } from '../../models/challenge.model';

@Component({
  selector: 'app-challenge-card',
  imports: [CommonModule, MatCardModule, MatButtonModule, MatProgressBarModule],
  templateUrl: './challenge-card.html',
  styleUrl: './challenge-card.css',
})
export class ChallengeCard {
  @Input() challenge!: Challenge;
  @Output() delete = new EventEmitter<number | undefined>();

  constructor(private router: Router) {}

  onView(): void {
    this.router.navigate([`/challenges/${this.challenge.id}`]);
  }

  onEdit(): void {
    this.router.navigate([`/challenges/${this.challenge.id}/edit`]);
  }

  onDelete(): void {
    this.delete.emit(this.challenge.id);
  }

  getProgressPercent(): number {
    if (this.challenge.targetValue === 0) return 0;
    return (this.challenge.currentValue / this.challenge.targetValue) * 100;
  }
}
