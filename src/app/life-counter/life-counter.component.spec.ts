import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LifeCounterComponent } from './life-counter.component';

describe('LifeCounterComponent', () => {
  let component: LifeCounterComponent;
  let fixture: ComponentFixture<LifeCounterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [LifeCounterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LifeCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
