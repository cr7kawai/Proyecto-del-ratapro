import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmpresaService } from '../../services/empresa.service';
import { Empresa } from '../../models/empresa.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-solicitar-mantenimiento',
  templateUrl: './solicitar-mantenimiento.component.html',
  styleUrls: ['./solicitar-mantenimiento.component.css'],
})
export class SolicitarMantenimientoComponent implements OnInit {
  empresas: Empresa[] = [];
  filteredEmpresas: Empresa[] = [];
  filterText: string = '';
  showDropdown: boolean = false;

    // Datos de la sesion
    datoSesion: any;
    idUsuario: any = null;
    idEmpresa: any = null;
    idRol: any = null;
    idArea: any = null;

  constructor(private empresaService: EmpresaService, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.datoSesion = this.authService.getUserData();

    if (this.datoSesion) {
      this.idUsuario = this.datoSesion.id;
      this.idEmpresa = this.datoSesion.idEmpresa;
      this.idRol = this.datoSesion.idRol;
      this.idArea = this.datoSesion.idArea;

      if (this.idRol == 3) {
        this.obtenerEmpresas();
      } else {
        this.router.navigate(['/']);
      }
    }
  }

  obtenerEmpresas(): void {
    this.empresaService.obtenerEmpresas().subscribe(
      (data: Empresa[]) => {
        this.empresas = data;
        this.filteredEmpresas = data;
      },
      (error) => {
        console.error('Error al obtener empresas', error);
      }
    );
  }

  filterEmpresas(): void {
    const searchTerm = this.filterText.trim().toLowerCase();
    if (searchTerm === '') {
      this.filteredEmpresas = this.empresas;
      this.showDropdown = false;
    } else {
      this.filteredEmpresas = this.empresas.filter((empresa) =>
        empresa.nombre?.toLowerCase().includes(searchTerm)
      );
      this.showDropdown = true;
    }
  }

  clearFilter(): void {
    this.filterText = '';
    this.filteredEmpresas = this.empresas;
    this.showDropdown = false;
  }

  selectEmpresa(empresa: Empresa): void {
    this.filterText = empresa.nombre ?? '';
    this.filterEmpresas();
    this.showDropdown = false;
  }

  verAreas(empresa: Empresa): void {
    this.router.navigate(['/areas-cliente', empresa.id]);
  }
}
