import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-category-form-page',
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './category-form-page.html',
  styleUrl: './category-form-page.css',
})
export class CategoryFormPage {}
