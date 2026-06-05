import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressEntryForm } from './progress-entry-form';

describe('ProgressEntryForm', () => {
  let component: ProgressEntryForm;
  let fixture: ComponentFixture<ProgressEntryForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressEntryForm],
    }).compileComponents();

    fixture = TestBed.createComponent(ProgressEntryForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
