import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { NgxCaptchaModule } from 'ngx-captcha';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SesionComponent } from './components/sesion/sesion.component';
import { AreasComponent } from './components/areas/areas.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TokenInterceptor } from './services/HttpInterceptor.service';
import { PoliticaPrivacidadComponent } from './components/politica-privacidad/politica-privacidad.component';
import { HomeComponent } from './components/home/home.component';
import { BuscadorComponent } from './components/buscador/buscador.component';
import { MapaComponent } from './components/mapa/mapa.component';
import { RegisterEmpresaComponent } from './components/register-empresa/register-empresa.component';
import { RegisterClienteComponent } from './components/register-cliente/register-cliente.component';
import { RegisterWhoComponent } from './components/register-who/register-who.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { MatIcon } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MantenimientosEmpleadoComponent } from './components/mantenimientos-empleado/mantenimientos-empleado.component';

@NgModule({
  declarations: [
    AppComponent,
    UsuarioComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    RegisterWhoComponent,
    RegisterEmpresaComponent,
    RegisterClienteComponent,
    ChangePasswordComponent,
    SesionComponent,
    AreasComponent,
    PoliticaPrivacidadComponent,
    BuscadorComponent,
    MapaComponent,
    MantenimientosEmpleadoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxCaptchaModule,
    MatCardModule,
    MatStepperModule,
    MatInputModule,
    FormsModule,
    ToastrModule.forRoot(),
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatSortModule,
    MatIcon,
    MatTooltipModule,
  ],
  providers: [
    provideClientHydration(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
