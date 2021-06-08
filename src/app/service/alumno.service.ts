import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  constructor(private _http: HttpClient) { }

  obtenerAlumnoPorIdPersona(id:string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this._http.get("http://localhost:3000/api/alumno/persona/"+id, httpOptions);
  }

  obtenerAlumnos(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this._http.get("http://localhost:3000/api/alumno/", httpOptions);
  }
}
