import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FieldSelectionPage } from './field-selection.page';

describe('FieldSelectionPage', () => {
  let component: FieldSelectionPage;
  let fixture: ComponentFixture<FieldSelectionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldSelectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
