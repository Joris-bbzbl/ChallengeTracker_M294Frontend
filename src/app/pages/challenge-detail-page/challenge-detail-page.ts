import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Challenge } from '../../models/challenge.model';
import { ProgressEntry } from '../../models/progress-entry.model';
import { ChallengeService } from '../../services/challenge.service';
import { ProgressEntryService } from '../../services/progress-entry.service';
import { ProgressEntryForm } from '../../components/progress-entry-form/progress-entry-form';
import { ProgressEntryList } from '../../components/progress-entry-list/progress-entry-list';

@Component({
  selector: 'app-challenge-detail-page',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatProgressBarModule,
    ProgressEntryForm,
    ProgressEntryList,
  ],
  templateUrl: './challenge-detail-page.html',
  styleUrl: './challenge-detail-page.css',
})
export class ChallengeDetailPage implements OnInit {
  challenge: Challenge | null = null;
  progressEntries: ProgressEntry[] = [];
  progressPercentage: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private challengeService: ChallengeService,
    private progressEntryService: ProgressEntryService,
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const challengeId = parseInt(id);
      this.loadChallenge(challengeId);
      this.loadProgressEntries(challengeId);
    }
  }

  private loadChallenge(id: number) {
    this.challengeService.getChallengeById(id).subscribe({
      next: (challenge) => {
        this.challenge = challenge;
        this.updateProgressPercentage();
      },
    });
  }

  private loadProgressEntries(id: number) {
    this.progressEntryService.getProgressByChallenge(id).subscribe({
      next: (entries) => {
        this.progressEntries = entries;
      },
    });
  }

  onProgressEntrySubmit(entry: ProgressEntry) {
    this.progressEntryService.createProgressEntry(entry).subscribe({
      next: () => {
        if (this.challenge) {
          this.loadChallenge(this.challenge.id!);
          this.loadProgressEntries(this.challenge.id!);
        }
      },
    });
  }

  private updateProgressPercentage() {
    if (this.challenge && this.challenge.targetValue > 0) {
      this.progressPercentage = (this.challenge.currentValue / this.challenge.targetValue) * 100;
      this.progressPercentage = Math.min(100, this.progressPercentage);
    }
  }

  goBack() {
    this.router.navigate(['/challenges']);
  }
}
