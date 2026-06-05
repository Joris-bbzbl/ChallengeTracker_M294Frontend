import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-no-access-page',
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './no-access-page.html',
  styleUrl: './no-access-page.css',
})
export class NoAccessPage {}
