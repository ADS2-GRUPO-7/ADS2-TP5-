import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import {AlifeFileToBase64Module} from 'alife-file-to-base64';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { PagoCuotaAlumnoComponent } from './components/pago-cuota-alumno/pago-cuota-alumno.component';
import { ConstanciaAlumnoRegularComponent } from './components/constancia-alumno-regular/constancia-alumno-regular.component';
import { PreceptorComponent } from './components/preceptor/preceptor.component';
import { SecretarioComponent } from './components/secretario/secretario.component';
import { NavComponent } from './components/layout/nav/nav.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { ConstruccionComponent } from './components/construccion/construccion.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    PagoCuotaAlumnoComponent,
    ConstanciaAlumnoRegularComponent,
    PreceptorComponent,
    SecretarioComponent,
    NavComponent,
    PrincipalComponent,
    ConstruccionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AlifeFileToBase64Module,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot() // ToastrModule added
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
