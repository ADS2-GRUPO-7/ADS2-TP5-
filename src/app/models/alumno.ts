export class Alumno {
    idAlumno!: string
    condicionRegular!: boolean
    idPersona!: string
    idCurso!: string
    idPersonaTutor!: string
    idConstanciaAlumno!: string

    constructor(condicionRegular:boolean,idPersona:string,idCurso:string){
        this.condicionRegular=condicionRegular
        this.idPersona=idPersona
        this.idCurso=idCurso
    }
}
