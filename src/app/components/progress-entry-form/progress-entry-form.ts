import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ProgressEntry } from '../../models/progress-entry.model';

@Component({
  selector: 'app-progress-entry-form',
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './progress-entry-form.html',
  styleUrl: './progress-entry-form.css',
})
export class ProgressEntryForm {
  @Input() challengeId!: number;
  @Output() progressSubmit = new EventEmitter<ProgressEntry>();
  value: number | null = null;
  note: string = '';
  date: string = '';
  onSubmit() {
    if (this.value !== null && this.challengeId) {
      const entry: ProgressEntry = {
        value: this.value,
        date: this.date,
        note: this.note,
        challengeId: this.challengeId,
      };
      this.progressSubmit.emit(entry);
      this.resetForm();
    }
  }

  private resetForm() {
    this.value = null;
    this.note = '';
    this.date = '';
  }
}
