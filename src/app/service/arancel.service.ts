import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Arancel } from '../models/arancel';
import { ToastrService } from 'ngx-toastr';
import { PersonaService } from './persona.service';
import { AlumnoService } from './alumno.service';
import { TablaDeAlumnosArancel } from '../models/tabla-de-alumnos-arancel';

@Injectable({
  providedIn: 'root'
})
export class ArancelService {

  constructor(private _http: HttpClient, private toarService: ToastrService,
    private personaService: PersonaService, private alumnoService: AlumnoService) { }


  

  public obtenerTodosArancelesCompletos(): Array<TablaDeAlumnosArancel> {
    let resultadoArray: Array<TablaDeAlumnosArancel>
    resultadoArray = []
    try {
      this.obtenerAranceles().subscribe(
        (aranceles) => {
          /* console.log(aranceles); */
          aranceles.forEach((arancel: { idAlumno: { idPersona: String; _id: string; }; }) => {
            /* console.log(element.idAlumno.idPersona); */
            let ar = arancel
            this.personaService.obtenerPersonasID(arancel.idAlumno.idPersona).subscribe(
              (persona) => {
                this.alumnoService.obtenerAlumnoPorId(arancel.idAlumno._id).subscribe(
                  (alumno) => {
                    /* console.log("entrandoooo "+alumno.idCurso.division) */
                    resultadoArray.push({Apellido:persona.apellido,"Nombre":persona.nombre,curso:alumno.idCurso.anio,division:alumno.idCurso.division,condicionRegular:"true"})
                  });
              });
              
          });
        });
      
    } catch (error) {
      console.log("error")
    }
/*     console.log(resultadoArray) */
    return resultadoArray
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
