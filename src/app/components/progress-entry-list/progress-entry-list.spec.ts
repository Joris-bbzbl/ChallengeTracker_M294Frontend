import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressEntryList } from './progress-entry-list';

describe('ProgressEntryList', () => {
  let component: ProgressEntryList;
  let fixture: ComponentFixture<ProgressEntryList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressEntryList],
    }).compileComponents();

    fixture = TestBed.createComponent(ProgressEntryList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
