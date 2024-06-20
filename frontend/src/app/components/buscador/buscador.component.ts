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

      const registroKeywords = ['Registro','Nueva Empresa'];
      this.keywordService.addKeywords('/register', registroKeywords);

      const passwordKeywords = ['Cambiar Contraseña'];
      this.keywordService.addKeywords('/changePassword', passwordKeywords)
    }

    // Privilegios de admin y cliente
    if(this.rol == 1 || this.rol == 3){
      const equipoAreasKeywords = ['Áreas', 'Departamentos'];
      this.keywordService.addKeywords('/areas', equipoAreasKeywords);
    }

    // Privilegios solo de admin
    if(this.rol == 1){
      const usuarioKeywords = ['Usuarios', 'Empleados', 'Clientes'];
      this.keywordService.addKeywords('/usuarios', usuarioKeywords);
    }

    // Privilegios de todos los logueados
    if(this.rol != null){
      const proyectoKeywords = ['Proyectos','Actividades','Trabajos','Mantenimientos'];
      this.keywordService.addKeywords('/mantenimientos', proyectoKeywords);
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