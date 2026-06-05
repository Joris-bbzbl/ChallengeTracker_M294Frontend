import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ProgressEntry } from '../models/progress-entry.model';

@Injectable({
  providedIn: 'root'
})
export class ProgressEntryService {
  private readonly baseUrl = `${environment.backendBaseUrl}/progress`;

  constructor(private http: HttpClient) {}

  // GET /progress/by-challenge/{id}
  getProgressByChallenge(challengeId: number): Observable<ProgressEntry[]> {
    return this.http.get<ProgressEntry[]>(`${this.baseUrl}/by-challenge/${challengeId}`);
  }

  // POST /progress
  createProgressEntry(progressEntry: ProgressEntry): Observable<ProgressEntry> {
    return this.http.post<ProgressEntry>(this.baseUrl, progressEntry);
  }
}
