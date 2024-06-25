import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AreaService } from '../../services/area.service';
import { AuthService } from '../../services/auth.service';
import { UsuarioService } from '../../services/usuario.service';
import { MantenimientoService } from '../../services/mantenimiento.service';
import { Area } from '../../models/area.interface';
import { Mantenimiento } from '../../models/mantenimiento.interface';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from '../../models/usuario.inteface';

@Component({
  selector: 'app-areas-cliente',
  templateUrl: './areas-cliente.component.html',
  styleUrls: ['./areas-cliente.component.css'],
})
export class AreasClienteComponent implements OnInit {
  areas: Area[] = [];
  filteredAreas: Area[] = [];
  filterText: string = '';
  empresaId: number;
  showDropdown: boolean = false;
  usuarioId: number;
  empleados: Usuario[] = [];
  addMantenimientoForm: FormGroup;
  @ViewChild('mantenimientoModal') mantenimientoDialog!: TemplateRef<any>;
  dialogRef!: MatDialogRef<any>;
  selectedArea!: Area; // Propiedad para almacenar el área seleccionada

  // Datos de la sesion
  datoSesion: any;
  idUsuario: any = null;
  idEmpresa: any = null;
  idRol: any = null;
  idArea: any = null;

  constructor(
    private areaService: AreaService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private usuarioService: UsuarioService,
    private mantenimientoService: MantenimientoService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.empresaId = this.route.snapshot.params['id'];
    const usuario = this.authService.getUserData();
    this.usuarioId = usuario ? usuario.id : 1; // Ajusta según cómo obtienes el ID del usuario actual
    this.addMantenimientoForm = this.fb.group({
      nombre: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      descripcion: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255),
        ],
      ],
      direccion: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(255),
        ],
      ],
      empleadoFk: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.datoSesion = this.authService.getUserData();

    if (this.datoSesion) {
      this.idUsuario = this.datoSesion.id;
      this.idEmpresa = this.datoSesion.idEmpresa;
      this.idRol = this.datoSesion.idRol;
      this.idArea = this.datoSesion.idArea;

      if (this.idRol == 3) {
        this.obtenerAreas();
      } else {
        this.router.navigate(['/']);
      }
    }
  }

  obtenerAreas(): void {
    this.areaService.obtenerAreas(this.empresaId).subscribe(
      (data: Area[]) => {
        this.areas = data;
        this.filteredAreas = data;
      },
      (error) => {
        console.error('Error al obtener áreas', error);
      }
    );
  }

  obtenerEmpleados(idArea: number): void {
    this.usuarioService.obtenerEmpleadosArea(idArea).subscribe(
      (data: Usuario[]) => {
        this.empleados = data;
      },
      (error) => {
        console.error('Error al obtener empleados', error);
      }
    );
  }

  filterAreas(): void {
    const searchTerm = this.filterText.trim().toLowerCase();
    if (searchTerm === '') {
      this.filteredAreas = this.areas;
      this.showDropdown = false;
    } else {
      this.filteredAreas = this.areas.filter((area) =>
        area.nombre?.toLowerCase().includes(searchTerm)
      );
      this.showDropdown = true;
    }
  }

  clearFilter(): void {
    this.filterText = '';
    this.filteredAreas = this.areas;
    this.showDropdown = false;
  }

  selectArea(area: Area): void {
    this.filterText = area.nombre ?? '';
    this.filterAreas();
    this.showDropdown = false;
  }

  solicitarMantenimiento(area: Area): void {
    if (area.id) {
      this.addMantenimientoForm.reset();
      this.selectedArea = area; // Almacena el área seleccionada en la propiedad
      this.obtenerEmpleados(area.id); // Cargar empleados del área seleccionada
      this.dialogRef = this.dialog.open(this.mantenimientoDialog, {
        width: '600px',
      });

      this.dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          console.log('Mantenimiento registrado:', result);
          this.saveMantenimiento();
        }
      });
    } else {
      console.error('El área seleccionada no tiene un ID válido');
    }
  }

  saveMantenimiento(): void {
    if (this.addMantenimientoForm.invalid) {
      return;
    }

    const mantenimiento: Mantenimiento = {
      ...this.addMantenimientoForm.value,
      fechaRegistro: this.formatDate(new Date()),
      costo: 0,
      estadoPago: 'Sin Costo Asignado',
      usuarioFk: this.usuarioId,
      areaFk: this.selectedArea.id, // Usa el área almacenada en la propiedad
      finalizado: 0,
      fechaFin: null,
      aceptado: 0,
    };

    this.mantenimientoService.registrarMantenimiento(mantenimiento).subscribe(
      (response) => {
        console.log('Mantenimiento guardado:', response);
        this.toastr.success('Mantenimiento Guardado y en Revisión');
        this.dialogRef.close();
      },
      (error) => {
        console.error('Error al guardar mantenimiento', error);
        this.toastr.error('Error al guardar mantenimiento');
      }
    );
  }

  formatDate(date: Date): string {
    return date.toISOString().slice(0, 19).replace('T', ' ');
  }

  close(): void {
    this.dialogRef.close();
  }
}
