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
import { UsuarioComponent } from './components/usuario/usuario.component';
import { MantenimientosEmpleadoComponent } from './components/mantenimientos-empleado/mantenimientos-empleado.component';
import { SolicitarMantenimientoComponent } from './components/solicitar-mantenimiento/solicitar-mantenimiento.component';
import { AreasClienteComponent } from './components/areas-cliente/areas-cliente.component';
import { MisMantenimientosComponent } from './components/mis-mantenimientos/mis-mantenimientos.component';

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
    component: RegisterWhoComponent,
  },
  {
    path: 'registro-empresa',
    component: RegisterEmpresaComponent,
  },
  {
    path: 'registro-cliente',
    component: RegisterClienteComponent,
  },
  {
    path: 'cambiar-contrasena',
    component: ChangePasswordComponent,
  },
  {
    path: 'usuario',
    component: UsuarioComponent,
  },
  {
    path: 'mapa-del-sitio',
    component: MapaComponent,
  },
  {
    path: 'areas',
    component: AreasComponent,
  },
  {
    path: 'empresas',
    component: SolicitarMantenimientoComponent,
  },
  { path: 'areas-cliente/:id', component: AreasClienteComponent },
  {
    path: 'mantenimiento',
    component: MantenimientosEmpleadoComponent,
  },
  {
    path: 'mis-mantenimientos',
    component: MisMantenimientosComponent,
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
