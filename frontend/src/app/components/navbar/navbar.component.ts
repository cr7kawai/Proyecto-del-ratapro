import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  datosUsuario: any;
  usuario: any = null;
  rol: any = null;
  plan: any = null;
  currentRoute: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.datosUsuario = this.authService.getUserData();
    if (this.datosUsuario) {
      this.usuario = this.datosUsuario.nombre;
      this.rol = this.datosUsuario.idRol;
      this.plan = this.datosUsuario.fk_suscripcion;
    }
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects;
      }
    });
  }

  cerrarSesion() {
    localStorage.removeItem('token');
    window.location.href = '/';
  }

  isEmpresasRoute(): boolean {
    return (
      this.currentRoute.includes('/areas-cliente') ||
      this.currentRoute === '/empresas'
    );
  }

  isRegistroRoute(): boolean {
    return (
      this.currentRoute.includes('/registro-empresa') ||
      this.currentRoute.includes('/registro-cliente') ||
      this.currentRoute === '/registro'
    );
  }

  isPasswordRoute(): boolean {
    return (
      this.currentRoute.includes('/cambiar-contrasena') ||
      this.currentRoute === '/login'
    );
  }
}
