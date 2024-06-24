import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmpresaService } from '../../services/empresa.service';
import { Empresa } from '../../models/empresa.interface';

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

  constructor(private empresaService: EmpresaService, private router: Router) {}

  ngOnInit(): void {
    this.obtenerEmpresas();
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
