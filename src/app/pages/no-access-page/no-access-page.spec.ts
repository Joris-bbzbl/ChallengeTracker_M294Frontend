import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoAccessPage } from './no-access-page';

describe('NoAccessPage', () => {
  let component: NoAccessPage;
  let fixture: ComponentFixture<NoAccessPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoAccessPage],
    }).compileComponents();

    fixture = TestBed.createComponent(NoAccessPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
