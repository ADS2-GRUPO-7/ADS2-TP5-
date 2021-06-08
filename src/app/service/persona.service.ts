import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  constructor(private _http: HttpClient) { }


  public obtenerPersonasDNI(dni:String): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
      })
    };
    return this._http.get("http://localhost:3000/api/persona/dni/"+dni, httpOptions);
  }

  public obtenerPersonasID(id:String): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
      })
    };
    return this._http.get("http://localhost:3000/api/persona/"+id, httpOptions);
  }

  obtenerPersonas(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this._http.get("http://localhost:3000/api/persona/", httpOptions);
  }
}
