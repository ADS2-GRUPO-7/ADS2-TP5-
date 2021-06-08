import { Component, OnInit } from '@angular/core';
import { ArancelService } from 'src/app/service/arancel.service';

@Component({
  selector: 'app-pago-cuota-alumno',
  templateUrl: './pago-cuota-alumno.component.html',
  styleUrls: ['./pago-cuota-alumno.component.css']
})
export class PagoCuotaAlumnoComponent implements OnInit {

  tablaDeAlumnos: any = {
    "Apellido": String,
    "Nombre": String,
    "condicionRegular": String
  }

  constructor(private arancelService: ArancelService) {
    arancelService.obtenerTodosArancelesCompletos()
    let tablaDeAlumnos = arancelService.obtenerAracnalPorDni("999999")
    /* console.log(tablaDeAlumnos.Apellido) */
  }

  ngOnInit(): void {
  }

}
