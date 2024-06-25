import { Component, TemplateRef, ViewChild } from '@angular/core';
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
import { MantenimientoService } from '../../services/mantenimiento.service';
import { AuthService } from '../../services/auth.service';
import { ComentarioService } from '../../services/comentario.service';
import { UsuarioService } from '../../services/usuario.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Comentario } from '../../models/comentario.interface';
import { MatSelectChange } from '@angular/material/select';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mis-mantenimientos',
  templateUrl: './mis-mantenimientos.component.html',
  styleUrls: ['./mis-mantenimientos.component.css'],
})
export class MisMantenimientosComponent {
  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private mantenimientoService: MantenimientoService,
    private authService: AuthService,
    private comentarioService: ComentarioService,
    private usuarioService: UsuarioService
  ) {
    this.costoForm = this.fb.group({
      costo: [0, [Validators.required, this.costoMayorACero]], // Add custom validator
      fecha: ['', [Validators.required, this.fechaMenoractual]],
    });

    this.paymentForm = this.fb.group({
      monto: [0, [Validators.required, this.montoMayorACero]],
    });
  }

  @ViewChild('aceptMantenimientoDialog')
  aceptMantenimientoDialog!: TemplateRef<any>;
  @ViewChild('comentariosDialog') comentariosDialog!: TemplateRef<any>;
  @ViewChild('paymentDialog') paymentDialog!: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    'nombre',
    'descripcion',
    'direccion',
    'encargado',
    'fechaFin',
    'costo',
    'area',
    'finalizado',
    'acciones',
  ];

  selectedFilter: string = 'pendiente';
  mantenimientos: Mantenimiento[] = [];
  usuarios: { [key: number]: string } = {};

  dataSource = new MatTableDataSource<Mantenimiento>([]);
  comentarios: Comentario[] = [];

  dialogRef!: MatDialogRef<any>;
  selectedComentarios: Comentario[] = [];
  selectedMantenimiento: any;
  costoForm: FormGroup;
  paymentForm: FormGroup;

  // Datos de la sesion
  datoSesion: any;
  idUsuario: any = null;
  idEmpresa: any = null;
  idRol: any = null;
  idArea: any = null;

  ngOnInit() {
    this.datoSesion = this.authService.getUserData();

    if (this.datoSesion) {
      this.idUsuario = this.datoSesion.id;
      this.idEmpresa = this.datoSesion.idEmpresa;
      this.idRol = this.datoSesion.idRol;
      this.idArea = this.datoSesion.idArea;

      this.obtenerTodosMantenimientosCliente();
    }
  }

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

  applyStatusFilter(event: MatSelectChange) {
    const filterValue = event.value;

    if (filterValue === 'pendiente') {
      this.mantenimientoService
        .obtenerMantenimientosIncompletosCliente(this.idUsuario)
        .subscribe((res) => {
          this.mantenimientos = res;

          this.dataSource.data = this.mantenimientos;
        });
    } else if (filterValue === 'completado') {
      this.mantenimientoService
        .obtenerMantenimientosCompletosCliente(this.idUsuario)
        .subscribe((res) => {
          this.mantenimientos = res;

          this.dataSource.data = this.mantenimientos;
        });
    } else if (filterValue === 'solicitud') {
      this.mantenimientoService
        .obtenerSolicitudesCliente(this.idUsuario)
        .subscribe((res) => {
          this.mantenimientos = res;
          this.dataSource.data = this.mantenimientos;
        });
    }
  }

  obtenerTodosMantenimientosCliente() {
    this.mantenimientoService
      .obtenerMantenimientosIncompletosCliente(this.idUsuario)
      .subscribe((incompletos) => {
        this.mantenimientoService
          .obtenerMantenimientosCompletosCliente(this.idUsuario)
          .subscribe((completos) => {
            this.mantenimientoService
              .obtenerSolicitudesCliente(this.idUsuario)
              .subscribe((solicitudes) => {
                this.mantenimientos = [
                  ...incompletos,
                  ...completos,
                  ...solicitudes,
                ];

                this.dataSource.data = this.mantenimientos;
              });
          });
      });
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
        this.mantenimientoService.terminarMantenimiento(element.id).subscribe(
          (res) => {
            this.toastr.success(
              'El mantenimiento ha sido finalizado.',
              'Finalizado'
            );
            this.obtenerTodosMantenimientosCliente();
          },
          (err) => {
            this.toastr.error(
              'No se ha podido finalizar el mantenimiento.',
              'Error'
            );
          }
        );
      }
    });
  }

  openComentariosDialog(element: Mantenimiento) {
    this.comentarioService.obtenerComentarios(element.id).subscribe((res) => {
      this.comentarios = res;
    });
    this.dialogRef = this.dialog.open(this.comentariosDialog, {
      width: '600px',
    });
  }

  openPaymentDialog(element: Mantenimiento) {
    this.selectedMantenimiento = element;
    this.dialogRef = this.dialog.open(this.paymentDialog, {
      width: '400px',
    });
  }

  realizarPago() {
    if (this.paymentForm.valid) {
      const formValue = this.paymentForm.value;
      const monto = formValue.monto;

      // Aquí estamos asumiendo que el pago se realiza exitosamente
      this.selectedMantenimiento.estadoPago = 'Pagado';
      this.toastr.success('El pago ha sido realizado.', 'Pago');
      this.obtenerTodosMantenimientosCliente();
      this.paymentForm.reset();
      this.dialogRef.close();
    }
  }

  verComentarios(element: Mantenimiento) {
    // Lógica para ver comentarios
    console.log('Ver Comentarios:', element);
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
        this.mantenimientoService.rechazarMantenimiento(element.id).subscribe(
          (res) => {
            this.toastr.success(
              'El mantenimiento ha sido rechazado.',
              'Rechazado'
            );
            this.obtenerTodosMantenimientosCliente();
          },
          (err) => {
            this.toastr.error(
              'No se ha podido eliminar el mantenimiento.',
              'Error'
            );
          }
        );
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
        this.mantenimientoService.cancelarMantenimiento(element.id).subscribe(
          (res) => {
            this.obtenerTodosMantenimientosCliente();
            this.toastr.success(
              'El mantenimiento ha sido rechazado.',
              'Rechazado'
            );
          },
          (err) => {
            this.toastr.error(
              'No se ha podido eliminar el mantenimiento.',
              'Error'
            );
          }
        );
      }
    });
  }

  openAceptMantenimientoDialog(element: Mantenimiento) {
    this.selectedMantenimiento = element.id;
    this.dialogRef = this.dialog.open(this.aceptMantenimientoDialog, {
      width: '400px',
    });
  }

  aceptarMantenimiento() {
    console.log(this.selectedMantenimiento);
    if (this.costoForm.valid) {
      const formValue = this.costoForm.value;
      const acept = formValue.costo;
      const fechaFin = formValue.fecha;
      this.mantenimientoService
        .aceptarMantenimiento(this.selectedMantenimiento, acept, fechaFin)
        .subscribe(
          (res) => {
            this.toastr.success(
              'El mantenimiento ha sido aceptado.',
              'Aceptado'
            );
            this.obtenerTodosMantenimientosCliente();
            this.costoForm.reset();
            this.dialogRef.close();
          },
          (err) => {
            this.toastr.error(
              'No se ha podido aceptar el mantenimiento.',
              'Error'
            );
          }
        );
    }
  }

  closeDialog() {
    this.dialogRef.close();
    this.costoForm.reset({ costo: 0 }); // Reset the form
  }

  private costoMayorACero(control: AbstractControl) {
    return control.value > 0 ? null : { costoInvalido: true };
  }

  private fechaMenoractual(control: AbstractControl) {
    const fechaSeleccionada = new Date(control.value);
    const fechaActual = new Date();
    fechaActual.setHours(0, 0, 0, 0); // Ajustar la fecha actual para comparar solo año, mes y día

    return fechaSeleccionada >= fechaActual ? null : { fechaInvalida: true };
  }

  private montoMayorACero(control: AbstractControl) {
    return control.value > 0 ? null : { montoInvalido: true };
  }
}
