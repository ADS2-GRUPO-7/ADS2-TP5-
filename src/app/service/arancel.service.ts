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


  public obtenerAracnalPorDni(dni: String): TablaDeAlumnosArancel {
    let resultadoPorDNI: TablaDeAlumnosArancel = new TablaDeAlumnosArancel()
    try {
      this.personaService.obtenerPersonasDNI(dni).subscribe(
        (persona) => {
          /* console.log(result); */
          const resultado = persona
          /* console.log(persona[0]._id) */
          try {
            this.alumnoService.obtenerAlumnoPorIdPersona(persona[0]._id).subscribe(
              (alumno) => {
                console.log(alumno);
                /* const resultado = alumno */
                resultadoPorDNI.Apellido = persona[0].apellido
                resultadoPorDNI.Nombre = persona[0].nombre
                resultadoPorDNI.condicionRegular = alumno[0].condicionRegular
                resultadoPorDNI.curso = alumno[0].idCurso.anio
                resultadoPorDNI.division = alumno[0].idCurso.division
                /* console.log(resultadoPorDNI) */
              });
          } catch (error) {
            console.log("vacio")
          }
        });
    } catch (error) {
      console.log("error, no se encontro nada")
    }
    return resultadoPorDNI
  }

  public obtenerTodosArancelesCompletos(): Array<TablaDeAlumnosArancel> {
    let resultadoObtenerTodo: TablaDeAlumnosArancel
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
                resultadoObtenerTodo = new TablaDeAlumnosArancel()
                resultadoObtenerTodo.Apellido = persona.apellido
                resultadoObtenerTodo.Nombre = persona.nombre

                this.alumnoService.obtenerAlumnoPorId(arancel.idAlumno._id).subscribe(
                  (alumno) => {
                    /* console.log("entrandoooo "+alumno.idCurso.division) */

                    resultadoObtenerTodo.curso = alumno.idCurso.anio
                    resultadoObtenerTodo.division = alumno.idCurso.division
                    
                    /* console.log(resultadoObtenerTodo) */

                  });
                  resultadoArray.push(resultadoObtenerTodo)
                /* console.log("ARANCEL")
                console.log(ar); */
                
              });

          });
        });
      /* console.log(resultadoArray) */
    } catch (error) {
      console.log("error")
    }
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
