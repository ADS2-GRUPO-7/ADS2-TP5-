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
                /* console.log(alumno); */
                /* const resultado = alumno */
                resultadoPorDNI.Apellido = persona[0].apellido
                resultadoPorDNI.Nombre = persona[0].nombre
                resultadoPorDNI.condicionRegular = alumno[0].condicionRegular
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
    let resultadoObtenerTodo: TablaDeAlumnosArancel = new TablaDeAlumnosArancel()
    let resultadoArray: Array<TablaDeAlumnosArancel> = []
    try {
      this.obtenerAranceles().subscribe(
        (arancel) => {
          /* console.log(arancel); */
          arancel.forEach((element: { idAlumno: { idPersona: String; }; }) => {
            /* console.log(element.idAlumno.idPersona); */
            this.personaService.obtenerPersonasID(element.idAlumno.idPersona).subscribe(
              (persona) => {
                /* console.log(persona); */
                resultadoObtenerTodo = new TablaDeAlumnosArancel()
                const resultado = persona
                resultadoObtenerTodo.Apellido = persona.apellido
                resultadoObtenerTodo.Nombre = persona.nombre
                resultadoArray.push(resultadoObtenerTodo)
              });
          });
        });
      /* console.log(resultadoObtenerTodo) */
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
