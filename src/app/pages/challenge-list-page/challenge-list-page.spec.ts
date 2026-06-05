import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeListPage } from './challenge-list-page';

describe('ChallengeListPage', () => {
  let component: ChallengeListPage;
  let fixture: ComponentFixture<ChallengeListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChallengeListPage],
    }).compileComponents();

    fixture = TestBed.createComponent(ChallengeListPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
