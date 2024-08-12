import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuelPage } from './duel.page';

describe('DuelPage', () => {
  let component: DuelPage;
  let fixture: ComponentFixture<DuelPage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(DuelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
