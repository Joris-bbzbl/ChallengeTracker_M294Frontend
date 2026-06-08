import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-category-form-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './category-form-page.html',
  styleUrl: './category-form-page.css',
})
export class CategoryFormPage implements OnInit {
  form: FormGroup;
  isEdit = false;
  private categoryId?: number;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.categoryId = Number(id);
        this.isEdit = true;
        this.loadCategory(this.categoryId);
      }
    });
  }

  get nameControl() {
    return this.form.get('name');
  }

  loadCategory(id: number): void {
    this.categoryService.getCategoryById(id).subscribe({
      next: (category) => {
        this.form.patchValue({
          name: category.name,
        });
      },
    });
  }

  onSave(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const category: Category = {
      name: this.form.value.name,
    };

    if (this.isEdit && this.categoryId != null) {
      this.categoryService.updateCategory(this.categoryId, category).subscribe({
        next: () => this.router.navigate(['/categories']),
      });
      return;
    }

    this.categoryService.createCategory(category).subscribe({
      next: () => this.router.navigate(['/categories']),
    });
  }

  onCancel(): void {
    this.router.navigate(['/categories']);
  }
}
