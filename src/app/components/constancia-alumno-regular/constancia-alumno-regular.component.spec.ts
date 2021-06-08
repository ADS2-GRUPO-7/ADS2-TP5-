import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstanciaAlumnoRegularComponent } from './constancia-alumno-regular.component';

describe('ConstanciaAlumnoRegularComponent', () => {
  let component: ConstanciaAlumnoRegularComponent;
  let fixture: ComponentFixture<ConstanciaAlumnoRegularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConstanciaAlumnoRegularComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstanciaAlumnoRegularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
