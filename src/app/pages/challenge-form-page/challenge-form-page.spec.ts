import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeFormPage } from './challenge-form-page';

describe('ChallengeFormPage', () => {
  let component: ChallengeFormPage;
  let fixture: ComponentFixture<ChallengeFormPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChallengeFormPage],
    }).compileComponents();

    fixture = TestBed.createComponent(ChallengeFormPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
