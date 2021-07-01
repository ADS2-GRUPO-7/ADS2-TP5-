import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarAsistenciaAlumnoComponent } from './gestionar-asistencia-alumno.component';

describe('GestionarAsistenciaAlumnoComponent', () => {
  let component: GestionarAsistenciaAlumnoComponent;
  let fixture: ComponentFixture<GestionarAsistenciaAlumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionarAsistenciaAlumnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionarAsistenciaAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
