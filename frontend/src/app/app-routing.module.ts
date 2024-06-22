import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/login/login.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { AreasComponent } from './components/areas/areas.component';
import { PoliticaPrivacidadComponent } from './components/politica-privacidad/politica-privacidad.component';
import { HomeComponent } from './components/home/home.component';
import { MapaComponent } from './components/mapa/mapa.component';
import { RegisterEmpresaComponent } from './components/register-empresa/register-empresa.component';
import { RegisterWhoComponent } from './components/register-who/register-who.component';
import { RegisterClienteComponent } from './components/register-cliente/register-cliente.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'registro',
    component: RegisterWhoComponent
  },
  {
    path: 'registro-empresa',
    component: RegisterEmpresaComponent,
  },
  {
    path: 'registro-cliente',
    component: RegisterClienteComponent
  },
  {
    path: 'changePassword',
    component: ChangePasswordComponent,
  },
  {
    path: 'mapa-del-sitio',
    component: MapaComponent
  },
  {
    path: 'areas',
    component: AreasComponent,
  },
  {
    path: 'politica-privacidad',
    component: PoliticaPrivacidadComponent,
  },
  {
    path: 'notFound',
    component: NotFoundComponent,
  },
  {
    path: '**',
    redirectTo: '/notFound',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
