import { Component, OnInit } from '@angular/core';
import { TablaDeAlumnosArancel } from 'src/app/models/tabla-de-alumnos-arancel';
import { ArancelService } from 'src/app/service/arancel.service';

@Component({
  selector: 'app-pago-cuota-alumno',
  templateUrl: './pago-cuota-alumno.component.html',
  styleUrls: ['./pago-cuota-alumno.component.css']
})
export class PagoCuotaAlumnoComponent implements OnInit {

  private alumnoParaTabla: TablaDeAlumnosArancel
  private tablaDeAlumnos: Array<TablaDeAlumnosArancel>

  private dniBusqueda : string = '00000000'
  private dniPago : string = '00000000'
  private metodoDePago: string = ''
  private cuotasPagadas: string = ''

  constructor(private arancelService: ArancelService) {
    this.alumnoParaTabla = new TablaDeAlumnosArancel()
    this.tablaDeAlumnos = new Array<TablaDeAlumnosArancel>()

    this.todosAlumnosArancel()
    this.buscarPorDni()
  }

  ngOnInit(): void {
  }

  generarPago(){

  }

  todosAlumnosArancel() {
    this.tablaDeAlumnos = new Array<TablaDeAlumnosArancel>()
    this.tablaDeAlumnos = this.arancelService.obtenerTodosArancelesCompletos()
    console.log(this.tablaDeAlumnos)
  }

  buscarPorDni() {
    this.tablaDeAlumnos = new Array<TablaDeAlumnosArancel>()
    this.alumnoParaTabla = this.arancelService.obtenerAracnalPorDni(this.dniBusqueda)
    this.tablaDeAlumnos.push(this.alumnoParaTabla)
    console.log(this.tablaDeAlumnos)
  }
}
