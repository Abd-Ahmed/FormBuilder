import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormCanvasPage } from './form-canvas.page';

describe('FormCanvasPage', () => {
  let component: FormCanvasPage;
  let fixture: ComponentFixture<FormCanvasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCanvasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
