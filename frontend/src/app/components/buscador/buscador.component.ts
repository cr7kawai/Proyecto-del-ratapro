import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeywordService } from '../../services/keywords.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {

  searchQuery: string = '';
  filteredKeywords: string[] = [];
  showResults: boolean = true;
  
  // Datos de la sesión
  datoSesion: any;
  usuario: any = null;
  rol: any = null;

  constructor(
    private keywordService: KeywordService,
    private router: Router,
    private elementRef: ElementRef,
    private authService: AuthService
  ) {}
    
  ngOnInit() {
    // Obtener datos del inicio de sesión
    this.datoSesion = this.authService.getUserData();

    if (this.datoSesion) {
      this.usuario = this.datoSesion.nombre;
      this.rol = this.datoSesion.idRol;
    }

    // Pa todos
    const inicioKeywords = ['Home', 'Inicio', 'Página Principal'];
    this.keywordService.addKeywords('/', inicioKeywords);

    const privacidadKeywords = ['Política de Privacidad'];
    this.keywordService.addKeywords('/politica-privacidad', privacidadKeywords);

    const mapaKeywords = ['Mapa del Sitio','Rutas','Índice'];
    this.keywordService.addKeywords('/mapa-del-sitio', mapaKeywords);

    // Cuando aún no tienen cuenta ni se han logueado
    if(this.rol == null){
      const loginKeywords = ['Login', 'Inicio de Sesión'];
      this.keywordService.addKeywords('/login', loginKeywords);

      const registroKeywords = ['Registro','Nueva Cuenta'];
      this.keywordService.addKeywords('/registro', registroKeywords);

      const registroCliente = ['Registro Cliente','Nuevo Cliente'];
      this.keywordService.addKeywords('/registro-cliente', registroCliente);

      const registroEmpresa = ['Registro Empresa','Nueva Empresa'];
      this.keywordService.addKeywords('/registro-empresa', registroEmpresa);

      const passwordKeywords = ['Cambiar Contraseña','Nueva Contraseña'];
      this.keywordService.addKeywords('/cambiar-contrasena', passwordKeywords)
    }

    // Privilegios de admin
    if(this.rol == 1){
      const equipoAreasKeywords = ['Áreas', 'Servicios', 'Mantenimientos'];
      this.keywordService.addKeywords('/areas', equipoAreasKeywords);
      const empleadoKeywords = ['Empleados'];
      this.keywordService.addKeywords('usuario', empleadoKeywords)
    }

    // Privilegios de empleado
    if(this.rol == 2){
      const mantenimientoKeywords = ['Mantenimientos', 'Servicios'];
      this.keywordService.addKeywords('/mantenimiento', mantenimientoKeywords);
    }

    // Privilegios de cliente
    if(this.rol == 3){
      const mantenimientoKeywords = ['Mantenimientos', 'Servicios'];
      this.keywordService.addKeywords('/mis-mantenimientos', mantenimientoKeywords);
      const empresaKeywords = ['Empresas', 'Áreas', 'Solicitud de Mantenimiento', 'Nuevo Mantenimiento'];
      this.keywordService.addKeywords('/empresas', empresaKeywords);
    }

    this.filterKeywords();
  }

  filterKeywords() {
    if(this.searchQuery != ""){
      const filtered = this.keywordService.searchKeywords(this.searchQuery);
      this.filteredKeywords = filtered.slice(0, 5);
    }else{
      this.filteredKeywords = [];
    }
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.showResults = false;
      this.searchQuery = ''
    }
  }

  onInputClick(event: MouseEvent) {
    this.showResults = true;
    event.stopPropagation();
  }

  redirectToRoute(keyword: string) {
    const route = this.keywordService.getRouteByKeyword(keyword);
    if (route) {
      this.router.navigate([route]);
      this.showResults = false;
      this.searchQuery = "";
    } else {
      console.log('Route not found for keyword:', keyword);
    }
  }
}