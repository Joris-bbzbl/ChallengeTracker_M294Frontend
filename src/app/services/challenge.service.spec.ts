import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { ChallengeService } from './challenge.service';
import { Challenge } from '../models/challenge.model';
import { environment } from '../../environments/environment';

describe('ChallengeService', () => {
  let service: ChallengeService;
  let httpMock: HttpTestingController;

  const baseUrl = `${environment.backendBaseUrl}/challenges`;

  const mockChallenge: Challenge = {
    id: 1,
    title: '100km Bike',
    description: 'Ride 100km',
    targetValue: 100,
    currentValue: 20,
    status: 'OPEN',
    categoryId: 1,
    categoryName: 'Mountainbike',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChallengeService, provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(ChallengeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all challenges', () => {
    const mockChallenges: Challenge[] = [mockChallenge];

    service.getChallenges().subscribe((challenges) => {
      expect(challenges).toEqual(mockChallenges);
    });

    const req = httpMock.expectOne(baseUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockChallenges);
  });

  it('should get one challenge by id', () => {
    service.getChallengeById(1).subscribe((challenge) => {
      expect(challenge).toEqual(mockChallenge);
    });

    const req = httpMock.expectOne(`${baseUrl}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockChallenge);
  });

  it('should create a challenge', () => {
    service.createChallenge(mockChallenge).subscribe((challenge) => {
      expect(challenge).toEqual(mockChallenge);
    });

    const req = httpMock.expectOne(baseUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockChallenge);
    req.flush(mockChallenge);
  });

  it('should update a challenge', () => {
    service.updateChallenge(1, mockChallenge).subscribe((challenge) => {
      expect(challenge).toEqual(mockChallenge);
    });

    const req = httpMock.expectOne(`${baseUrl}/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockChallenge);
    req.flush(mockChallenge);
  });

  it('should delete a challenge', () => {
    service.deleteChallenge(1).subscribe((response) => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`${baseUrl}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
