import {
  Component,
  TemplateRef,
  ViewChild,
  AfterViewInit,
  OnInit,
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
import { MantenimientoService } from '../../services/mantenimiento.service';
import { AuthService } from '../../services/auth.service';
import { ComentarioService } from '../../services/comentario.service';

@Component({
  selector: 'app-mantenimientos-empleado',
  templateUrl: './mantenimientos-empleado.component.html',
  styleUrls: ['./mantenimientos-empleado.component.css'],
})
export class MantenimientosEmpleadoComponent implements AfterViewInit, OnInit {
  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private mantenimientoService: MantenimientoService,
    private authService: AuthService,
    private comentarioService: ComentarioService
  ) {
    this.costoForm = this.fb.group({
      costo: [0, [Validators.required, this.costoMayorACero]], // Add custom validator
      fecha: ['', [Validators.required, this.fechaMenoractual]],
    });
    this.comentarioForm = this.fb.group({
      descripcion: ['', [Validators.required]]
    })
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
    'cliente',
    'fechaFin',
    'costo',
    'estadoPago',
    'acciones',
  ];

  selectedFilter: string = 'pendiente';
  mantenimientos: Object[] = [];

  dataSource = new MatTableDataSource<Mantenimiento>([]);

  comentarios: Comentario[] = [];

  dialogRef!: MatDialogRef<any>;
  selectedComentarios: Comentario[] = [];

  selectedMantenimiento: any;
  costoForm: FormGroup;
  comentarioForm: FormGroup;

  idMantenimiento: any;

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

      this.mantenimientoService
        .obtenerMantenimientosIncompletosEmpleado(this.idUsuario)
        .subscribe((res) => {
          this.mantenimientos = res;
          console.log(this.idUsuario);
          this.dataSource.data = this.mantenimientos;
        });
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

  // FILTRO DE MANTENIMIENTOS
  applyStatusFilter(event: MatSelectChange) {
    const filterValue = event.value;

    if (filterValue === 'pendiente') {
      this.mantenimientoService
        .obtenerMantenimientosIncompletosEmpleado(this.idUsuario)
        .subscribe((res) => {
          this.mantenimientos = res;
          this.dataSource.data = this.mantenimientos;
        });
    } else if (filterValue === 'completado') {
      this.mantenimientoService
        .obtenerMantenimientosCompletosEmpleado(this.idUsuario)
        .subscribe((res) => {
          this.mantenimientos = res;
          this.dataSource.data = this.mantenimientos;
        });
    } else if (filterValue === 'solicitud') {
      this.mantenimientoService
        .obtenerSolicitudesEmpleado(this.idUsuario)
        .subscribe((res) => {
          this.mantenimientos = res;
          this.dataSource.data = this.mantenimientos;
        });
    }
  }

  obtenerMantenimientosIncompletosEmpleado() {
    this.mantenimientoService
      .obtenerMantenimientosIncompletosEmpleado(this.idUsuario)
      .subscribe((res) => {
        this.mantenimientos = res;
        this.dataSource.data = this.mantenimientos;
      });
  }

  obtenerMantenimientosCompletosEmpleado() {
    this.mantenimientoService
      .obtenerMantenimientosCompletosEmpleado(this.idUsuario)
      .subscribe((res) => {
        this.mantenimientos = res;
        this.dataSource.data = this.mantenimientos;
      });
  }

  obtenerSolicitudesEmpleado() {
    this.mantenimientoService
      .obtenerSolicitudesEmpleado(this.idUsuario)
      .subscribe((res) => {
        this.mantenimientos = res;
        this.dataSource.data = this.mantenimientos;
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
            this.obtenerMantenimientosIncompletosEmpleado();
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
    this.idMantenimiento = element.id
    this.loadComentarios(this.idMantenimiento);
    this.dialogRef = this.dialog.open(this.comentariosDialog, {
      width: '600px'
    });
  }

  loadComentarios(id: any){
    this.comentarioService.obtenerComentarios(id).subscribe((res) => {
      this.comentarios = res;
    },err=>{
      this.toastr.error(
        'No se han podido obtener los comentarios',
        'Error'
      );
    });
  }

  addComentario(){
    if (this.comentarioForm.valid) {
      const newComentario: Comentario = {
        ...this.comentarioForm.value,
      };
      newComentario.usuarioFk = this.idUsuario;
      newComentario.mantenimientoFk = this.idMantenimiento;
      newComentario.fecha = this.getFormattedDate(new Date());
      this.comentarioService.registrarComentario(newComentario).subscribe(res =>{
        this.comentarioForm.reset();
        this.loadComentarios(this.idMantenimiento);
        this.toastr.success('Comentario registrado exitosamente', 'Éxito');
      },err =>{
        this.toastr.error('No se ha podido registrar el comentario', 'Error');
      })
    }
  }

  getFormattedDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
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
            this.obtenerSolicitudesEmpleado();
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
            this.obtenerMantenimientosIncompletosEmpleado();
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
      width: '500px',
    });
  }

  aceptarMantenimiento() {
    console.log(this.selectedMantenimiento);
    if (this.costoForm.valid) {
      const formValue = this.costoForm.value;
      const acept = formValue.costo;
      const fechaFin = formValue.fecha;
      console.log();
      this.mantenimientoService
        .aceptarMantenimiento(this.selectedMantenimiento, acept, fechaFin)
        .subscribe(
          (res) => {
            this.toastr.success(
              'El mantenimiento ha sido aceptado.',
              'Aceptado'
            );
            this.obtenerSolicitudesEmpleado();
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
}
