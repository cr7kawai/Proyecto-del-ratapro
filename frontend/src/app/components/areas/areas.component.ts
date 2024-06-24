import {
  Component,
  ViewChild,
  TemplateRef,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Area } from '../../models/area.interface';
import { Mantenimiento } from '../../models/mantenimiento.interface';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.css'],
})
export class AreasComponent implements AfterViewInit {
  @ViewChild('addAreaDialog') addAreaDialog!: TemplateRef<any>;
  @ViewChild('mantenimientosDialog') mantenimientosDialog!: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  areas: Area[] = [
    { id: 1, nombre: 'Área 1', descripcion: 'Descripción del Área 1' },
    { id: 2, nombre: 'Área 2', descripcion: 'Descripción del Área 2' },
    { id: 3, nombre: 'Área 3', descripcion: 'Descripción del Área 3' },
  ];

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
    'empleadoFk',
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

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {
    this.addAreaForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
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

  saveArea(): void {
    if (this.addAreaForm.valid) {
      const newArea: Area = {
        ...this.addAreaForm.value,
        id: this.areas.length + 1,
      };
      this.areas.push(newArea);
      this.filterAreas(); // Ensure areas are filtered after adding a new area
      this.addAreaForm.reset();
      this.dialogRef.close();
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
    this.dataSource.data = this.mantenimientos.filter(
      (m) => m.areaFk === area.id // Use area.id instead of area.nombre
    );
    this.mantenimientosDialogRef = this.dialog.open(this.mantenimientosDialog, {
      width: '1200px',
      data: { area: area },
    });

    this.mantenimientosDialogRef.afterOpened().subscribe(() => {
      this.dataSource.paginator = this.paginator;
      console.log('Paginator after dialog open:', this.paginator);
      console.log(
        'DataSource Paginator after dialog open:',
        this.dataSource.paginator
      );
    });
  }
}
