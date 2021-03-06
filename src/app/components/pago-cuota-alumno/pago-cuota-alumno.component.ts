import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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

  meses: Array<String> = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto",
    "septiembre", "octubre", "noviembre", "diciembre", ""]

  dniBusqueda: string = '66666666'    // para llenar desde vista
  dniPago: string = '000000'        // para llenar desde vista
  metodoDePago: string = ''            // para llenar desde vista
  mesesAPagar: number = 1

  subtotal: number = 0
  ultimoMesPagado!: String

  private usuario: Usuario = new Usuario;

  constructor(private arancelService: ArancelService, private personaService: PersonaService,
    private alumnoService: AlumnoService, private cursoService: CursoService, private toarService: ToastrService) {

    /* this.buscarPorDni() */
    /* this.generarPago() */
  }

  ngOnInit(): void {
  }

  generarPago() {

    console.log(Number(this.mesesAPagar) + Number(this.meses.indexOf(this.ultimoMesPagado)))
    if (this.mesesAPagar >= 1 && (Number(this.mesesAPagar) + Number(this.meses.indexOf(this.ultimoMesPagado) + 1) <= 12)) {
      let pago: any = {}

      pago.fecha = new Date()
      for (let index = 1; index <= this.mesesAPagar; index++) {
        pago.numeroDeCuota = this.meses.indexOf(this.ultimoMesPagado) + 1 + index

        pago.idUsuario = "60befb60d26d7cc144dcf86c"      //id usuario
        pago.idAlumno = this.alumno._id
        pago.monto = this.curso.arancel
        try {
          this.arancelService.guardarArancel(pago).subscribe(
            (result) => {
              console.log(result)

              if (index == this.mesesAPagar) {
                this.buscarPorDni()
              }
            });
        } catch (error) {
          console.log("error al guardar pago")
        }
      }
    } else {
      console.log("ERRORR mal ingresado")
      this.toarService.error('No se puede ingresar un numero negativo o 0, ni pagar mas de 1 a??o', 'Aranceles')
    }
  }

  buscarPorDni() {
    try {
      this.personaService.obtenerPersonasDNI(this.dniBusqueda).subscribe(
        (persona) => {
          this.persona = persona[0]
          console.log(persona[0])
          if (persona) {
            try {
              this.alumnoService.obtenerAlumnoPorIdPersona(persona[0]._id).subscribe(
                (alumno) => {
                  this.alumno = alumno[0]
                  console.log(this.alumno)
                  this.curso = this.alumno.idCurso

                  this.ultimoMes()
                });
            } catch (error) {
              this.toarService.error('No se encontro a la persona', 'Aranceles')
              console.log("error al obtener alumno")
            }
          } else {
            this.toarService.error('No se encontro a la persona', 'Aranceles')
          }

        });
    } catch (error) {
      console.log("error al obtener persona")
    }
  }

  obtenerSubTotal() {
    if (this.mesesAPagar >= 1) {
      try {
        if (this.curso.arancel) {
          this.subtotal = this.mesesAPagar * this.curso.arancel
          console.log(this.subtotal)
        }
      } catch (error) {
        console.log("algo malo")
      }
    } else {
      this.subtotal = 0
    }

  }

  ultimoMes() {

    try {
      this.arancelService.obtenerAranceles().subscribe(
        (result) => {
          console.log(result)
          result.forEach((element: { idAlumno: string; numeroDeCuota: number; }) => {
            if (element.idAlumno == this.alumno._id) {
              this.ultimoMesPagado = this.meses[element.numeroDeCuota - 1]
              console.log(element.idAlumno)
            }
          });
        });
    } catch (error) {
      console.log("error al guardar pago")
    }
  }
}
