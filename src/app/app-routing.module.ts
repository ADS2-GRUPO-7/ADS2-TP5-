import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ConstanciaAlumnoRegularComponent} from './components/constancia-alumno-regular/constancia-alumno-regular.component'
import {NavComponent} from './components/layout/nav/nav.component' 
import {HeaderComponent} from './components/layout/header/header.component'
import {FooterComponent} from './components/layout/footer/footer.component'
import {LoginComponent} from './components/login/login.component'
import {PagoCuotaAlumnoComponent} from './components/pago-cuota-alumno/pago-cuota-alumno.component'
import {PreceptorComponent} from './components/preceptor/preceptor.component'
import {PrincipalComponent} from './components/principal/principal.component' 
import {SecretarioComponent } from './components/secretario/secretario.component';
import {ConstruccionComponent} from './components/construccion/construccion.component'
import { GenerarUsuarioComponent } from './components/generar-usuario/generar-usuario.component';
import {GestionarAsistenciaAlumnoComponent} from './components/gestionar-asistencia-alumno/gestionar-asistencia-alumno.component'

const routes: Routes = [

    { path: '' , component: PrincipalComponent },
     { path: 'login' , component: LoginComponent },
    { path: 'secretario' , component: SecretarioComponent },
    { path: 'preceptor' , component: PreceptorComponent },

    { path: 'usuario' , component: GenerarUsuarioComponent },
    { path: 'constancia' , component: ConstanciaAlumnoRegularComponent },
    { path: 'pago' , component: PagoCuotaAlumnoComponent },
    { path: 'asistenciaAlumno' , component: GestionarAsistenciaAlumnoComponent },
    { path: 'construccion' , component: ConstruccionComponent },
    { path: '**', pathMatch:'full',redirectTo:'construccion' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
