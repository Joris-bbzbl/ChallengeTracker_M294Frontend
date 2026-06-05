import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ChallengeService } from '../../services/challenge.service';
import { CategoryService } from '../../services/category.service';
import { Challenge } from '../../models/challenge.model';
import { Category } from '../../models/category.model';
import { ChallengeCard } from '../../components/challenge-card/challenge-card';

@Component({
  selector: 'app-challenge-list-page',
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    ChallengeCard,
  ],
  templateUrl: './challenge-list-page.html',
  styleUrl: './challenge-list-page.css',
})
export class ChallengeListPage implements OnInit {
  challenges: Challenge[] = [];
  filteredChallenges: Challenge[] = [];
  categories: Category[] = [];
  selectedCategoryId: number | null = null;

  constructor(
    private challengeService: ChallengeService,
    private categoryService: CategoryService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });

    this.challengeService.getChallenges().subscribe((challenges) => {
      this.challenges = challenges;
      this.filterChallenges();
    });
  }

  filterChallenges(): void {
    if (this.selectedCategoryId === null) {
      this.filteredChallenges = this.challenges;
    } else {
      this.filteredChallenges = this.challenges.filter(
        (c) => c.categoryId === this.selectedCategoryId,
      );
    }
  }

  onCategoryChange(): void {
    this.filterChallenges();
  }

  createChallenge(): void {
    this.router.navigate(['/challenges/new']);
  }

  onDeleteChallenge(id: number | undefined): void {
    if (id === undefined) return;
    this.challengeService.deleteChallenge(id).subscribe(() => {
      this.loadData();
    });
  }
}
