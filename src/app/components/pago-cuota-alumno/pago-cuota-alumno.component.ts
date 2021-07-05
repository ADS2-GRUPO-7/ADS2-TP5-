import { Component, OnInit } from '@angular/core';
import { Arancel } from 'src/app/models/arancel';
import { TablaDeAlumnosArancel } from 'src/app/models/tabla-de-alumnos-arancel';
import { Usuario } from 'src/app/models/usuario';
import { AlumnoService } from 'src/app/service/alumno.service';
import { ArancelService } from 'src/app/service/arancel.service';
import { CursoService } from 'src/app/service/curso.service';
import { PersonaService } from 'src/app/service/persona.service';

@Component({
  selector: 'app-pago-cuota-alumno',
  templateUrl: './pago-cuota-alumno.component.html',
  styleUrls: ['./pago-cuota-alumno.component.css']
})
export class PagoCuotaAlumnoComponent implements OnInit {


  persona: any
  alumno: any
  curso: any

  dniBusqueda: string = '66666666'    // para llenar desde vista
  dniPago: string = '000000'        // para llenar desde vista
  metodoDePago: string = ''            // para llenar desde vista
  mesesAPagar: number = 0

  subtotal: number = 0
  ultimoMesPagado: string = ''

  private usuario: Usuario = new Usuario;

  constructor(private arancelService: ArancelService, private personaService: PersonaService,
    private alumnoService: AlumnoService, private cursoService: CursoService) {

    /* this.buscarPorDni() */
    /* this.generarPago() */
  }

  ngOnInit(): void {
  }

  generarPago() {
    let pago: any = {}
    /* this.usuario  = new Usuario() */

    pago.fecha = new Date()
    /* pago.numeroDeCuota = this.mesesAPagar */

    pago.numeroDeCuota = 'Julio'

    pago.idUsuario = "60befb60d26d7cc144dcf86c"                        //en futturo cambbiar

    pago.idAlumno = this.alumno._id
    try {
      this.arancelService.guardarArancel(pago).subscribe(
        (result) => {
          console.log(result)
          /* console.log(pago) */
        });
    } catch (error) {
      console.log("error al guardar pago")
    }
  }

  buscarPorDni() {
    try {
      this.personaService.obtenerPersonasDNI(this.dniBusqueda).subscribe(
        (persona) => {
          this.persona = persona[0]
          /* console.log("persona: "+persona[0]._id) */
          console.log(this.persona)
          try {
            this.alumnoService.obtenerAlumnoPorIdPersona(persona[0]._id).subscribe(
              (alumno) => {
                this.alumno = alumno[0]
                console.log(this.alumno)
                this.curso = this.alumno.idCurso
                /* console.log("cursoooooooo")
                console.log(this.curso) */
                this.ultimoMes()
              });
          } catch (error) {
            console.log("error al obtener alumno")
          }
        });
    } catch (error) {
      console.log("error al obtener persona")
    }
  }

  obtenerSubTotal() {
    try {
      if (this.curso.arancel) {
        this.subtotal = this.mesesAPagar * this.curso.arancel
        console.log(this.subtotal)
      }
    } catch (error) {
      console.log("algo malo")
    }
  }

  ultimoMes() {

  }
}
