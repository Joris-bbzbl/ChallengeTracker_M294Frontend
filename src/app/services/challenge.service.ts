import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Challenge } from '../models/challenge.model';

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {
  private readonly baseUrl = `${environment.backendBaseUrl}/challenges`;

  constructor(private http: HttpClient) {}

  // GET /challenges
  getChallenges(): Observable<Challenge[]> {
    return this.http.get<Challenge[]>(this.baseUrl);
  }

  // GET /challenges/{id}
  getChallengeById(id: number): Observable<Challenge> {
    return this.http.get<Challenge>(`${this.baseUrl}/${id}`);
  }

  // POST /challenges
  createChallenge(challenge: Challenge): Observable<Challenge> {
    return this.http.post<Challenge>(this.baseUrl, challenge);
  }

  // PUT /challenges/{id}
  updateChallenge(id: number, challenge: Challenge): Observable<Challenge> {
    return this.http.put<Challenge>(`${this.baseUrl}/${id}`, challenge);
  }

  // DELETE /challenges/{id}
  deleteChallenge(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
