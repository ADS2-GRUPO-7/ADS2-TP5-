import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Arancel } from '../models/arancel';
import { ToastrService } from 'ngx-toastr';
import { PersonaService } from './persona.service';
import { AlumnoService } from './alumno.service';

@Injectable({
  providedIn: 'root'
})
export class ArancelService {

  constructor(private _http: HttpClient, private toarService: ToastrService,
    private personaService: PersonaService, private alumnoService: AlumnoService) { }


  public obtenerAracnalPorDni(dni: String): any {

    this.personaService.obtenerPersonasDNI(dni).subscribe(
      (persona) => {
        /* console.log(result); */
        const resultado = persona
        /* console.log(persona[0]._id) */
        this.alumnoService.obtenerAlumnoPorIdPersona(persona[0]._id).subscribe(
          (alumno) => {
            console.log(alumno);
            /* const resultado = alumno */
            let resultadoPorDNI: any =
            {
              "Apellido": persona[0].apellido,
              "Nombre": persona[0].nombre,
              "condicionRegular": alumno.condicionRegular
            }
            /* console.log(resultadoPorDNI) */
            return resultadoPorDNI
          });
      });
  }

  public obtenerTodosArancelesCompletos() {
    this.obtenerAranceles().subscribe(
      (arancel) => {
        /* console.log(arancel); */
        arancel.forEach((element: { idAlumno: { idPersona: String; }; }) => {
          /* console.log(element.idAlumno.idPersona); */
          this.personaService.obtenerPersonasID(element.idAlumno.idPersona).subscribe(
            (persona) => {
              /* console.log(result); */
              const resultado = persona
            });
        });
      });
  }

  public obtenerAranceles(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this._http.get("http://localhost:3000/api/arancel/", httpOptions);
  }

  public guardarArancel(arancel: Arancel): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    this.toarService.success('Arancel Guardado correctamente', 'Aranceles')
    return this._http.post<Arancel>("http://localhost:3000/api/arancel/", arancel, httpOptions);
  }
}
