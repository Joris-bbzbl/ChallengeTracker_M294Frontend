import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { ProgressEntry } from '../../models/progress-entry.model';

@Component({
  selector: 'app-progress-entry-list',
  imports: [CommonModule, MatTableModule],
  templateUrl: './progress-entry-list.html',
  styleUrl: './progress-entry-list.css',
})
export class ProgressEntryList {
  @Input() entries: ProgressEntry[] = [];
  displayedColumns: string[] = ['date', 'value', 'note'];
}
