import {
  Component,
  ViewChild,
  TemplateRef,
  AfterViewInit,
  ChangeDetectorRef,
  OnInit
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Area } from '../../models/area.interface';
import { Mantenimiento } from '../../models/mantenimiento.interface';
import { AuthService } from '../../services/auth.service';
import { AreaService } from '../../services/area.service';
import { ToastrService } from 'ngx-toastr';
import { MantenimientoService } from '../../services/mantenimiento.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.css'],
})
export class AreasComponent implements AfterViewInit, OnInit {
  @ViewChild('addAreaDialog') addAreaDialog!: TemplateRef<any>;
  @ViewChild('mantenimientosDialog') mantenimientosDialog!: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  areas: Area[] = [];

  mantenimientos: Mantenimiento[] = [
    {
      nombre: 'OSTIAS CHAVAL',
      descripcion: 'Descripción del Mantenimiento 1',
      fechaRegistro: new Date(Date.now()),
      aceptado: true,
      costo: 2000,
      estadoPago: 'Pagado',
      finalizado: true,
      fechaFin: new Date(Date.now()),
      empleadoFk: 1,
      areaFk: 1, // ID del área correspondiente
    },
    {
      nombre: 'Mantenimiento 1',
      descripcion: 'Messi',
      fechaRegistro: new Date(Date.now()),
      aceptado: true,
      costo: 2000,
      estadoPago: 'Pagado',
      finalizado: true,
      fechaFin: new Date(Date.now()),
      empleadoFk: 1,
      areaFk: 1, // ID del área correspondiente
    },
    {
      nombre: 'Mantenimiento 1',
      descripcion: 'Descripción del Mantenimiento 1',
      fechaRegistro: new Date(Date.now()),
      aceptado: true,
      costo: 2000,
      estadoPago: 'Pagado',
      finalizado: true,
      fechaFin: new Date(Date.now()),
      empleadoFk: 1,
      areaFk: 1, // ID del área correspondiente
    },
    {
      nombre: 'Mantenimiento 1',
      descripcion: 'Descripción del Mantenimiento 1',
      fechaRegistro: new Date(Date.now()),
      aceptado: true,
      costo: 2000,
      estadoPago: 'Pagado',
      finalizado: true,
      fechaFin: new Date(Date.now()),
      empleadoFk: 1,
      areaFk: 1, // ID del área correspondiente
    },

    {
      nombre: 'Mantenimiento 1',
      descripcion: 'Descripción del Mantenimiento 1',
      fechaRegistro: new Date(Date.now()),
      aceptado: true,
      costo: 2000,
      estadoPago: 'Pagado',
      finalizado: true,
      fechaFin: new Date(Date.now()),
      empleadoFk: 1,
      areaFk: 1, // ID del área correspondiente
    },
    {
      nombre: 'Mantenimiento 1',
      descripcion: 'Descripción del Mantenimiento 1',
      fechaRegistro: new Date(Date.now()),
      aceptado: true,
      costo: 2000,
      estadoPago: 'Pagado',
      finalizado: true,
      fechaFin: new Date(Date.now()),
      empleadoFk: 1,
      areaFk: 1, // ID del área correspondiente
    },
    {
      nombre: 'OSTIAS CHAVAL',
      descripcion: 'Descripción del Mantenimiento 1',
      fechaRegistro: new Date(Date.now()),
      aceptado: true,
      costo: 2000,
      estadoPago: 'Pagado',
      finalizado: true,
      fechaFin: new Date(Date.now()),
      empleadoFk: 1,
      areaFk: 1, // ID del área correspondiente
    },
    {
      nombre: 'Mantenimiento 1',
      descripcion: 'Messi',
      fechaRegistro: new Date(Date.now()),
      aceptado: true,
      costo: 2000,
      estadoPago: 'Pagado',
      finalizado: true,
      fechaFin: new Date(Date.now()),
      empleadoFk: 1,
      areaFk: 1, // ID del área correspondiente
    },
    {
      nombre: 'Mantenimiento 1',
      descripcion: 'Descripción del Mantenimiento 1',
      fechaRegistro: new Date(Date.now()),
      aceptado: true,
      costo: 2000,
      estadoPago: 'Pagado',
      finalizado: true,
      fechaFin: new Date(Date.now()),
      empleadoFk: 1,
      areaFk: 1, // ID del área correspondiente
    },
    {
      nombre: 'Mantenimiento 1',
      descripcion: 'Descripción del Mantenimiento 1',
      fechaRegistro: new Date(Date.now()),
      aceptado: true,
      costo: 2000,
      estadoPago: 'Pagado',
      finalizado: true,
      fechaFin: new Date(Date.now()),
      empleadoFk: 1,
      areaFk: 1, // ID del área correspondiente
    },

    {
      nombre: 'Mantenimiento 1',
      descripcion: 'Descripción del Mantenimiento 1',
      fechaRegistro: new Date(Date.now()),
      aceptado: true,
      costo: 2000,
      estadoPago: 'Pagado',
      finalizado: true,
      fechaFin: new Date(Date.now()),
      empleadoFk: 1,
      areaFk: 1, // ID del área correspondiente
    },
    {
      nombre: 'Mantenimiento 1',
      descripcion: 'Descripción del Mantenimiento 1',
      fechaRegistro: new Date(Date.now()),
      aceptado: true,
      costo: 2000,
      estadoPago: 'Pagado',
      finalizado: true,
      fechaFin: new Date(Date.now()),
      empleadoFk: 1,
      areaFk: 1, // ID del área correspondiente
    },
    {
      nombre: 'OSTIAS CHAVAL',
      descripcion: 'Descripción del Mantenimiento 1',
      fechaRegistro: new Date(Date.now()),
      aceptado: true,
      costo: 2000,
      estadoPago: 'Pagado',
      finalizado: true,
      fechaFin: new Date(Date.now()),
      empleadoFk: 1,
      areaFk: 1, // ID del área correspondiente
    },
    {
      nombre: 'Mantenimiento 1',
      descripcion: 'Messi',
      fechaRegistro: new Date(Date.now()),
      aceptado: true,
      costo: 2000,
      estadoPago: 'Pagado',
      finalizado: true,
      fechaFin: new Date(Date.now()),
      empleadoFk: 1,
      areaFk: 1, // ID del área correspondiente
    },
    {
      nombre: 'Mantenimiento 1',
      descripcion: 'Descripción del Mantenimiento 1',
      fechaRegistro: new Date(Date.now()),
      aceptado: true,
      costo: 2000,
      estadoPago: 'Pagado',
      finalizado: true,
      fechaFin: new Date(Date.now()),
      empleadoFk: 1,
      areaFk: 1, // ID del área correspondiente
    },
    {
      nombre: 'Mantenimiento 1',
      descripcion: 'Descripción del Mantenimiento 1',
      fechaRegistro: new Date(Date.now()),
      aceptado: true,
      costo: 2000,
      estadoPago: 'Pagado',
      finalizado: true,
      fechaFin: new Date(Date.now()),
      empleadoFk: 1,
      areaFk: 1, // ID del área correspondiente
    },

    {
      nombre: 'Mantenimiento 1',
      descripcion: 'Descripción del Mantenimiento 1',
      fechaRegistro: new Date(Date.now()),
      aceptado: true,
      costo: 2000,
      estadoPago: 'Pagado',
      finalizado: true,
      fechaFin: new Date(Date.now()),
      empleadoFk: 1,
      areaFk: 1, // ID del área correspondiente
    },
    {
      nombre: 'Toto',
      descripcion: 'Descripción del Mantenimiento 1',
      fechaRegistro: new Date(Date.now()),
      aceptado: true,
      costo: 2000,
      estadoPago: 'Pagado',
      finalizado: true,
      fechaFin: new Date(Date.now()),
      empleadoFk: 1,
      areaFk: 1, // ID del área correspondiente
    },
    {
      nombre: 'Mantenimiento 2',
      descripcion: 'Descripción del Mantenimiento 2',
      fechaRegistro: new Date(Date.now()),
      aceptado: true,
      costo: 3000,
      estadoPago: 'Pendiente',
      finalizado: false,
      fechaFin: new Date(Date.now()),
      empleadoFk: 2,
      areaFk: 2, // ID del área correspondiente
    },
    {
      nombre: 'Mantenimiento 3',
      descripcion: 'Descripción del Mantenimiento 3',
      fechaRegistro: new Date(Date.now()),
      aceptado: false,
      costo: 1500,
      estadoPago: 'Pagado',
      finalizado: true,
      fechaFin: new Date(Date.now()),
      empleadoFk: 3,
      areaFk: 3, // ID del área correspondiente
    },
  ];

  dataSource = new MatTableDataSource<Mantenimiento>(this.mantenimientos);
  displayedColumns: string[] = [
    'nombre',
    'descripcion',
    'empleado',
    'fechaRegistro',
    'fechaFin',
    'aceptado',
    'costo',
    'estadoPago',
    'finalizado',
  ]; // Añadir más columnas según sea necesario
  filteredAreas: Area[] = this.areas; // Initially display all areas
  filterText: string = '';
  showDropdown: boolean = false;

  addAreaForm: FormGroup;
  dialogRef!: MatDialogRef<any>;
  mantenimientosDialogRef!: MatDialogRef<any>;

  datoSesion: any;
  idUsuario: any = null;
  idEmpresa: any = null;
  idRol: any = null;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private authService: AuthService,
    private areaService: AreaService,
    private mantenimientoService: MantenimientoService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.addAreaForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.datoSesion = this.authService.getUserData();

    if (this.datoSesion) {
      this.idUsuario = this.datoSesion.id;
      this.idEmpresa = this.datoSesion.idEmpresa;
      this.idRol = this.datoSesion.idRol;

      this.loadAreas();
    } else{
      window.location.href = '/'
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.cdr.detectChanges();
    console.log('Paginator:', this.paginator);
    console.log('DataSource Paginator:', this.dataSource.paginator);
  }

  openDialog(): void {
    this.dialogRef = this.dialog.open(this.addAreaDialog, {
      width: '500px',
      panelClass: 'custom-dialog-container',
    });
  }

  loadAreas(){
    this.areaService.obtenerAreas(this.idEmpresa).subscribe(res =>{
      this.areas = res;
      this.filterAreas()
    })
  }

  saveArea(): void {
    if (this.addAreaForm.valid) {
      const newArea: Area = {
        ...this.addAreaForm.value,
      };
      newArea.empresaFk = this.idEmpresa;
      this.areaService.registrarArea(newArea).subscribe(res =>{
        this.loadAreas()
        this.addAreaForm.reset();
        this.dialogRef.close();
        this.toastr.success('Área registrada exitosamente', 'Éxito');
      },err =>{
        this.toastr.error('No se ha podido registrar la área', 'Error');
      })
    }
  }

  filterAreas(): void {
    if (this.filterText.trim() === '') {
      this.filteredAreas = this.areas; // Show all areas when the filter is empty
      this.showDropdown = false;
    } else {
      this.filteredAreas = this.areas.filter((area) =>
        area.nombre?.toLowerCase().includes(this.filterText.toLowerCase())
      );
      this.showDropdown = this.filteredAreas.length > 0; // Show dropdown only if there are filtered areas
    }
  }

  selectArea(area: Area): void {
    this.filterText = area.nombre ?? ''; // Usar un valor por defecto si area.nombre es undefined
    this.filterAreas(); // Add this line to filter the areas
    this.showDropdown = false;
  }

  clearFilter(): void {
    this.filterText = '';
    this.filterAreas();
  }

  closeMantenimientosDialog(): void {
    this.mantenimientosDialogRef.close();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openMantenimientosDialog(area: Area): void {
    this.mantenimientoService.obtenerMantenimientosArea(area.id).subscribe(res => {
      this.dataSource.data = res;
      this.mantenimientosDialogRef = this.dialog.open(this.mantenimientosDialog, {
        width: '1200px',
        data: { area: area },
      });

      this.mantenimientosDialogRef.afterOpened().subscribe(() => {
        this.dataSource.paginator = this.paginator;
        console.log('Paginator after dialog open:', this.paginator);
        console.log('DataSource Paginator after dialog open:', this.dataSource.paginator);
      });
    }, err => {
      this.toastr.error('Error al cargar los mantenimientos del área', 'Error');
    });
  }
}
