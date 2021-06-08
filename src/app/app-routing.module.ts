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
const routes: Routes = [

    { path: 'home' , component: PrincipalComponent },
    { path: 'secretario' , component: SecretarioComponent },
    { path: 'preceptor' , component: PreceptorComponent },
    { path: 'login' , component: LoginComponent },
    { path: 'constancia' , component: ConstanciaAlumnoRegularComponent },
    { path: 'pago' , component: PagoCuotaAlumnoComponent },
    { path: 'construccion' , component: ConstruccionComponent },
    { path: '**', pathMatch:'full',redirectTo:'construccion' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
