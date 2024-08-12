import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SelectProfilesComponent } from './select-profiles.component';

describe('SelectProfilesComponent', () => {
  let component: SelectProfilesComponent;
  let fixture: ComponentFixture<SelectProfilesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [SelectProfilesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
