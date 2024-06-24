import {
  Component,
  TemplateRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Mantenimiento } from '../../models/mantenimiento.interface';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { Comentario } from '../../models/comentario.interface';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-mantenimientos-empleado',
  templateUrl: './mantenimientos-empleado.component.html',
  styleUrls: ['./mantenimientos-empleado.component.css'],
})
export class MantenimientosEmpleadoComponent implements AfterViewInit {
  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) {
    this.costoForm = this.fb.group({
      costo: [0, [Validators.required, this.costoMayorACero]], // Add custom validator
    });
  }

  @ViewChild('aceptMantenimientoDialog')
  aceptMantenimientoDialog!: TemplateRef<any>;
  @ViewChild('comentariosDialog')
  comentariosDialog!: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    'nombre',
    'descripcion',
    'direccion',
    'fechaRegistro',
    'fechaFin',
    'costo',
    'estadoPago',
    'acciones',
  ];

  selectedFilter: string = 'pendiente';

  dataSource = new MatTableDataSource<Mantenimiento>([
    {
      id: 1,
      nombre: 'Mantenimiento A',
      descripcion: 'Descripción del Mantenimiento A',
      direccion: 'Dirección A',
      fechaRegistro: new Date('2023-01-01'),
      aceptado: true,
      costo: 0, // Costo nulo
      estadoPago: 'Sin Costo Asignado',
      finalizado: false,
      fechaFin: new Date('2023-01-10'),
      usuarioFk: 1,
      areaFk: 1,
      empleadoFk: 2,
    },
    {
      id: 2,
      nombre: 'Mantenimiento B',
      descripcion: 'Descripción del Mantenimiento B',
      direccion: 'Dirección B',
      fechaRegistro: new Date('2023-02-01'),
      aceptado: true,
      costo: 2000,
      estadoPago: 'Pendiente',
      finalizado: false,
      fechaFin: new Date('2023-02-10'),
      usuarioFk: 1,
      areaFk: 1,
      empleadoFk: 3,
    },
    {
      id: 3,
      nombre: 'Mantenimiento C',
      descripcion: 'Descripción del Mantenimiento C',
      direccion: 'Dirección C',
      fechaRegistro: new Date('2023-03-01'),
      aceptado: false,
      costo: 1500,
      estadoPago: 'Pagado',
      finalizado: true,
      fechaFin: new Date('2023-03-10'),
      usuarioFk: 1,
      areaFk: 1,
      empleadoFk: 4,
    },
    {
      id: 3,
      nombre: 'Mantenimiento C',
      descripcion: 'Descripción del Mantenimiento C',
      direccion: 'Dirección C',
      fechaRegistro: new Date('2023-03-01'),
      aceptado: false,
      costo: 1500,
      estadoPago: 'Pagado',
      finalizado: false,
      fechaFin: new Date('2023-03-10'),
      usuarioFk: 1,
      areaFk: 1,
      empleadoFk: 4,
    },
    {
      id: 3,
      nombre: 'Mantenimiento C',
      descripcion: 'Descripción del Mantenimiento C',
      direccion: 'Dirección C',
      fechaRegistro: new Date('2023-03-01'),
      aceptado: false,
      costo: 1500,
      estadoPago: 'Pagado',
      finalizado: false,
      fechaFin: new Date('2023-03-10'),
      usuarioFk: 1,
      areaFk: 1,
      empleadoFk: 4,
    },
    {
      id: 3,
      nombre: 'Mantenimiento C',
      descripcion: 'Descripción del Mantenimiento C',
      direccion: 'Dirección C',
      fechaRegistro: new Date('2023-03-01'),
      aceptado: false,
      costo: 1500,
      estadoPago: 'Pagado',
      finalizado: false,
      fechaFin: new Date('2023-03-10'),
      usuarioFk: 1,
      areaFk: 1,
      empleadoFk: 4,
    },
    {
      id: 3,
      nombre: 'Mantenimiento C',
      descripcion: 'Descripción del Mantenimiento C',
      direccion: 'Dirección C',
      fechaRegistro: new Date('2023-03-01'),
      aceptado: false,
      costo: 1500,
      estadoPago: 'Pagado',
      finalizado: false,
      fechaFin: new Date('2023-03-10'),
      usuarioFk: 1,
      areaFk: 1,
      empleadoFk: 4,
    },
  ]);

  comentarios: Comentario[] = [
    {
      id: 1,
      descripcion: 'Comentario A1',
      fecha: new Date('2023-01-02'),
      mantenimientoFk: 1,
    },
    {
      id: 2,
      descripcion: 'Comentario A2',
      fecha: new Date('2023-01-03'),
      mantenimientoFk: 1,
    },
    {
      id: 1,
      descripcion: 'Comentario A1',
      fecha: new Date('2023-01-02'),
      mantenimientoFk: 1,
    },
    {
      id: 2,
      descripcion: 'Comentario A2',
      fecha: new Date('2023-01-03'),
      mantenimientoFk: 1,
    },
    {
      id: 3,
      descripcion: 'Comentario B1',
      fecha: new Date('2023-02-02'),
      mantenimientoFk: 2,
    },
    {
      id: 4,
      descripcion: 'Comentario C1',
      fecha: new Date('2023-03-02'),
      mantenimientoFk: 3,
    },
    {
      id: 5,
      descripcion: 'Comentario C2',
      fecha: new Date('2023-03-03'),
      mantenimientoFk: 3,
    },
    {
      id: 4,
      descripcion: 'Comentario C1',
      fecha: new Date('2023-03-02'),
      mantenimientoFk: 3,
    },
    {
      id: 5,
      descripcion: 'Comentario C2',
      fecha: new Date('2023-03-03'),
      mantenimientoFk: 3,
    },
    {
      id: 4,
      descripcion: 'Comentario C1',
      fecha: new Date('2023-03-02'),
      mantenimientoFk: 3,
    },
    {
      id: 5,
      descripcion: 'Comentario C2',
      fecha: new Date('2023-03-03'),
      mantenimientoFk: 3,
    },
  ];

  dialogRef!: MatDialogRef<any>;
  selectedComentarios: Comentario[] = [];

  selectedMantenimiento!: Mantenimiento;
  costoForm: FormGroup;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // FILTRO DE MANTENIMIENTOS
  applyStatusFilter(event: MatSelectChange) {
    const filterValue = event.value;

    console.log(filterValue);
  }

  finalizarMantenimiento(element: Mantenimiento) {
    Swal.fire({
      title: '¿Está seguro?',
      text: 'Confirme que desea finalizar el mantenimiento.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, finalizar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        // Lógica para finalizar el mantenimiento
        element.finalizado = true;
        this.toastr.success(
          'El mantenimiento ha sido finalizado.',
          'Finalizado'
        );
      }
    });
  }

  openComentariosDialog(element: Mantenimiento) {
    this.selectedMantenimiento = element;
    this.selectedComentarios = this.comentarios.filter(
      (comentario) => comentario.mantenimientoFk === element.id
    );
    this.dialogRef = this.dialog.open(this.comentariosDialog, {
      width: '600px',
    });
  }

  verComentarios(element: Mantenimiento) {
    // Lógica para ver comentarios
    console.log('Ver Comentarios:', element);
  }

  aceptarMantenimiento(element: Mantenimiento) {
    // Lógica para aceptar mantenimiento
    console.log('Aceptar Mantenimiento:', element);
  }

  rechazarMantenimiento(element: Mantenimiento) {
    Swal.fire({
      title: '¿Está seguro?',
      text: '¡No podrá revertir esta acción!',
      icon: 'warning',
      showCancelButton: true,

      confirmButtonText: 'Sí, rechazar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        // Lógica para eliminar el mantenimiento
        this.dataSource.data = this.dataSource.data.filter(
          (mantenimiento) => mantenimiento.id !== element.id
        );
        this.toastr.success('El mantenimiento ha sido rechazado.', 'Rechazado');
      }
    });
  }

  cancelarServicio(element: Mantenimiento) {
    Swal.fire({
      title: '¿Está seguro?',
      text: '¡No podrá revertir esta acción!',
      icon: 'warning',
      showCancelButton: true,

      confirmButtonText: 'Sí, Cancelar Servicio',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        // Lógica para eliminar el mantenimiento
        this.dataSource.data = this.dataSource.data.filter(
          (mantenimiento) => mantenimiento.id !== element.id
        );
        this.toastr.success('El mantenimiento ha sido cancelado.', 'Cancelado');
      }
    });
  }

  openAceptMantenimientoDialog(element: Mantenimiento) {
    this.selectedMantenimiento = element;
    this.dialogRef = this.dialog.open(this.aceptMantenimientoDialog, {
      width: '400px',
    });
  }
  registrarCosto() {
    if (this.costoForm.valid) {
      const costo = this.costoForm.get('costo')?.value;
      this.selectedMantenimiento.costo = costo;
      this.selectedMantenimiento.estadoPago = 'Pendiente';
      this.dialogRef.close();
      this.toastr.success(
        'El costo ha sido registrado y el estado del pago actualizado a Pendiente.',
        'Costo Registrado'
      );
      this.costoForm.reset({ costo: 0 }); // Reset the form
    }
  }

  closeDialog() {
    this.dialogRef.close();
    this.costoForm.reset({ costo: 0 }); // Reset the form
  }

  private costoMayorACero(control: AbstractControl) {
    return control.value > 0 ? null : { costoInvalido: true };
  }
}
