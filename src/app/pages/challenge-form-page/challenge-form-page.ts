import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ChallengeService } from '../../services/challenge.service';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';
import { Challenge } from '../../models/challenge.model';

@Component({
  selector: 'app-challenge-form-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './challenge-form-page.html',
  styleUrl: './challenge-form-page.css',
})
export class ChallengeFormPage implements OnInit {
  form: FormGroup;
  categories: Category[] = [];
  isEdit = false;
  private existingChallenge?: Challenge;

  constructor(
    private fb: FormBuilder,
    private challengeService: ChallengeService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      targetValue: [null, [Validators.required, Validators.min(1)]],
      startDate: [''],
      endDate: [''],
      categoryId: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadCategories();

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.loadChallengeById(Number(id));
      }
    });
  }

  get titleControl() {
    return this.form.get('title');
  }

  get targetValueControl() {
    return this.form.get('targetValue');
  }

  get categoryControl() {
    return this.form.get('categoryId');
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
    });
  }

  loadChallengeById(id: number): void {
    this.challengeService.getChallengeById(id).subscribe({
      next: (challenge) => {
        this.existingChallenge = challenge;
        this.isEdit = true;
        this.form.patchValue({
          title: challenge.title,
          description: challenge.description,
          targetValue: challenge.targetValue,
          startDate: challenge.startDate ?? '',
          endDate: challenge.endDate ?? '',
          categoryId: challenge.categoryId ?? null,
        });
      },
    });
  }

  onSave(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue = this.form.value;

    if (this.isEdit && this.existingChallenge?.id != null) {
      const updatedChallenge: Challenge = {
        ...this.existingChallenge,
        title: formValue.title,
        description: formValue.description,
        targetValue: formValue.targetValue,
        startDate: formValue.startDate || undefined,
        endDate: formValue.endDate || undefined,
        categoryId: formValue.categoryId,
      };

      this.challengeService.updateChallenge(this.existingChallenge.id, updatedChallenge).subscribe({
        next: () => this.router.navigate(['/challenges']),
      });
      return;
    }

    const newChallenge: Challenge = {
      title: formValue.title,
      description: formValue.description,
      targetValue: formValue.targetValue,
      currentValue: 0,
      status: 'OPEN',
      startDate: formValue.startDate || undefined,
      endDate: formValue.endDate || undefined,
      categoryId: formValue.categoryId,
      userId: 1 || 2 || 3 || 4 || 5,
    };

    this.challengeService.createChallenge(newChallenge).subscribe({
      next: () => this.router.navigate(['/challenges']),
    });
  }

  onCancel(): void {
    this.router.navigate(['/challenges']);
  }
}
