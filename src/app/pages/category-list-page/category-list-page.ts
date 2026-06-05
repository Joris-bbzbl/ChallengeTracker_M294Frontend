import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-category-list-page',
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './category-list-page.html',
  styleUrl: './category-list-page.css',
})
export class CategoryListPage {}
