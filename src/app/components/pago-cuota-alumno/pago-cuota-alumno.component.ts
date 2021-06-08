import { Component, OnInit } from '@angular/core';
import { Arancel } from 'src/app/models/arancel';
import { TablaDeAlumnosArancel } from 'src/app/models/tabla-de-alumnos-arancel';
import { Usuario } from 'src/app/models/usuario';
import { AlumnoService } from 'src/app/service/alumno.service';
import { ArancelService } from 'src/app/service/arancel.service';
import { PersonaService } from 'src/app/service/persona.service';

@Component({
  selector: 'app-pago-cuota-alumno',
  templateUrl: './pago-cuota-alumno.component.html',
  styleUrls: ['./pago-cuota-alumno.component.css']
})
export class PagoCuotaAlumnoComponent implements OnInit {

  private alumnoParaTabla: TablaDeAlumnosArancel
  private tablaDeAlumnos: Array<TablaDeAlumnosArancel>

  private dniBusqueda : string = '00000000'    // para llenar desde vista
  private dniPago : string = '999999'        // para llenar desde vista
  private metodoDePago: string = ''            // para llenar desde vista
  private cuotasPagadas: string = '0'           // para llenar desde vistas

  private usuario: Usuario = new Usuario;

  constructor(private arancelService: ArancelService, private personaService:PersonaService,
    private alumnoService:AlumnoService) {
    this.alumnoParaTabla = new TablaDeAlumnosArancel()
    this.tablaDeAlumnos = new Array<TablaDeAlumnosArancel>()

    this.todosAlumnosArancel()
    /* this.buscarPorDni() */
    /* this.generarPago() */
  }

  ngOnInit(): void {
  }

  generarPago(){
    let arancel :Arancel
    /* this.usuario  = new Usuario() */
    arancel = new Arancel
    arancel.numeroDeCuota= this.cuotasPagadas
    arancel.idUsuario= "60befb60d26d7cc144dcf86c"           //en futturo cambbiar
    try {
      this.personaService.obtenerPersonasDNI(this.dniPago).subscribe(
        (persona) => {
          console.log(persona[0]._id)
          try {
            this.alumnoService.obtenerAlumnoPorIdPersona(persona[0]._id).subscribe(
              (alumno) => {
                arancel.idAlumno=alumno[0]._id
                console.log(arancel.idAlumno)
                try {
                  this.arancelService.guardarArancel(arancel).subscribe(
                    (result) => {
                      console.log(result)
                      this.todosAlumnosArancel()
                    });
                } catch (error) {
                  console.log("error al guardar")
                }
              });
          } catch (error) {
            console.log("error al guardar")
          }
        });
    } catch (error) {
      console.log("error al guardar")
    }
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
