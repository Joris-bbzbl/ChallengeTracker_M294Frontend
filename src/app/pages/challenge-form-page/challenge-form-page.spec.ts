import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { ChallengeFormPage } from './challenge-form-page';
import { ChallengeService } from '../../services/challenge.service';
import { CategoryService } from '../../services/category.service';
import { Challenge } from '../../models/challenge.model';
import { Category } from '../../models/category.model';

describe('ChallengeFormPage', () => {
  let component: ChallengeFormPage;
  let fixture: ComponentFixture<ChallengeFormPage>;

  const mockCategories: Category[] = [
    { id: 1, name: 'Mountainbike' },
    { id: 2, name: 'Gym' },
  ];

  const mockChallenge: Challenge = {
    id: 1,
    title: '100km Bike',
    description: 'Ride 100km',
    targetValue: 100,
    currentValue: 20,
    status: 'OPEN',
    categoryId: 1,
  };

  const challengeServiceMock = {
    getChallengeById: vi.fn(),
    createChallenge: vi.fn(),
    updateChallenge: vi.fn(),
    deleteChallenge: vi.fn(),
    getChallenges: vi.fn(),
  };

  const categoryServiceMock = {
    getCategories: vi.fn(),
    getCategoryById: vi.fn(),
    createCategory: vi.fn(),
    updateCategory: vi.fn(),
    deleteCategory: vi.fn(),
  };

  const routerMock = {
    navigate: vi.fn(),
  };

  beforeEach(async () => {
    vi.clearAllMocks();

    categoryServiceMock.getCategories.mockReturnValue(of(mockCategories));
    challengeServiceMock.getChallengeById.mockReturnValue(of(mockChallenge));
    challengeServiceMock.createChallenge.mockReturnValue(of(mockChallenge));
    challengeServiceMock.updateChallenge.mockReturnValue(of(mockChallenge));

    await TestBed.configureTestingModule({
      imports: [ChallengeFormPage],
      providers: [
        provideNoopAnimations(),
        { provide: ChallengeService, useValue: challengeServiceMock },
        { provide: CategoryService, useValue: categoryServiceMock },
        { provide: Router, useValue: routerMock },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({})),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ChallengeFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should create the form', () => {
    expect(component.form).toBeTruthy();
  });

  it('should load categories on init', () => {
    expect(categoryServiceMock.getCategories).toHaveBeenCalled();
    expect(component.categories).toEqual(mockCategories);
  });

  it('should be invalid when required fields are missing', () => {
    component.form.patchValue({
      title: '',
      targetValue: null,
      categoryId: null,
    });

    expect(component.form.invalid).toBe(true);
  });

  it('should create a new challenge when form is valid', () => {
    component.form.patchValue({
      title: 'New Challenge',
      description: 'Test description',
      targetValue: 50,
      startDate: '',
      endDate: '',
      categoryId: 1,
    });

    component.onSave();

    expect(challengeServiceMock.createChallenge).toHaveBeenCalled();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/challenges']);
  });

  it('should not save when form is invalid', () => {
    component.form.patchValue({
      title: '',
      targetValue: null,
      categoryId: null,
    });

    component.onSave();

    expect(challengeServiceMock.createChallenge).not.toHaveBeenCalled();
    expect(challengeServiceMock.updateChallenge).not.toHaveBeenCalled();
  });

  it('should navigate back on cancel', () => {
    component.onCancel();

    expect(routerMock.navigate).toHaveBeenCalledWith(['/challenges']);
  });
});
