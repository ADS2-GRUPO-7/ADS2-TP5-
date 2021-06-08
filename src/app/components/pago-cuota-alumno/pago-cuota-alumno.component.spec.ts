import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoCuotaAlumnoComponent } from './pago-cuota-alumno.component';

describe('PagoCuotaAlumnoComponent', () => {
  let component: PagoCuotaAlumnoComponent;
  let fixture: ComponentFixture<PagoCuotaAlumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagoCuotaAlumnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoCuotaAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
