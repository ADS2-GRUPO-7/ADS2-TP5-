import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreceptorComponent } from './preceptor.component';

describe('PreceptorComponent', () => {
  let component: PreceptorComponent;
  let fixture: ComponentFixture<PreceptorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreceptorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreceptorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
