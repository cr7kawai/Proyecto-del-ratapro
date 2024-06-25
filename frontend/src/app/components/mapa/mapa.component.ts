import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  searchQuery: string = '';
  filteredKeywords: string[] = [];
  showResults: boolean = true;
  
  // Datos de la sesión
  datoSesion: any;
  usuario: any = null;
  rol: any = null;

  // Mapa del sitio
  siteMap: any = {};

  constructor(
    private router: Router,
    private elementRef: ElementRef,
    private authService: AuthService
  ) {}
    
  ngOnInit() {
    // Verificar la sesión
    this.datoSesion = this.authService.getUserData();
    if (this.datoSesion) {
      this.usuario = this.datoSesion.nombre;
      this.rol = this.datoSesion.idRol;
    }

    // Construir mapa del sitio
    this.buildSiteMap();
    console.log(this.siteMap)
  }

  buildSiteMap() {
    // Rutas para todos
    this.siteMap['principal'] = ['Home','/'];

    this.siteMap['informacion'] = [
      ['Política de Privacidad', '/politica-privacidad'],
      ['Mapa del Sitio', '/mapa-del-sitio']
    ];

    // Cuando aún no tienen cuenta ni se han logueado
    this.siteMap['sesion'] = [ 
      ['Inicio de Sesión','/login'],
      ['Cambio de Contraseña','/cambiar-contrasena'],
      ['Registro','/registro'],
      ['Registro de Empresa','/registro-empresa'],
      ['Registro de Cliente','/registro-cliente']
    ];

    if (this.rol == 1) {
      if (!this.siteMap['administracion']) {
        this.siteMap['administracion'] = [];
      }
      this.siteMap['administracion'].push(['Áreas y Mantenimientos', '/areas']);
      this.siteMap['administracion'].push(['Empleados', '/usuario']);
    }

    // Privilegios de empleado
    if (this.rol == 2) {
      if (!this.siteMap['administracion']) {
        this.siteMap['administracion'] = [];
      }
      this.siteMap['administracion'].push(['Mantenimientos', '/mantenimiento']);
    }

    // Privilegios de cliente
    if (this.rol == 3) {
      if (!this.siteMap['administracion']) {
        this.siteMap['administracion'] = [];
      }
      this.siteMap['administracion'].push(['Empresas, Áreas y Mantenimientos', '/empresas']);
      this.siteMap['administracion'].push(['Mis Mantenimientos', '/mis-mantenimientos']);
    }
  }
}