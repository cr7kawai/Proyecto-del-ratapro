import { ChangeDetectorRef, Component, TemplateRef, ViewChild } from '@angular/core';
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
import { Router } from '@angular/router';

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
    private router: Router
  ) {
    this.costoForm = this.fb.group({
      costo: [0, [Validators.required, this.costoMayorACero]], // Add custom validator
      fecha: ['', [Validators.required, this.fechaMenoractual]],
    });

    this.comentarioForm = this.fb.group({
      descripcion: ['', [Validators.required]]
    })

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
  comentarioForm: FormGroup;
  pagoModal: boolean = false;

  mantenimientoPago: Mantenimiento = {};
  
  idMantenimiento: any;
  costoMantenimiento: any = 0;

  // Datos de la sesion
  datoSesion: any;
  idUsuario: any = null;
  idEmpresa: any = null;
  idRol: any = null;
  idArea: any = null;

  ngOnInit() {
    if(this.costoMantenimiento > 0){
     //PayPal
     setTimeout(() => {
      paypal.Buttons({
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: this.costoMantenimiento
              }
            }]
          });
        },
        onApprove: (data: any, actions: any) => {
          return actions.order.capture().then((details: any) => {
            this.realizarPago()
          });
        },
        onError: (err: any) => {
          console.log(err)
          this.toastr.error('No se ha podido procesar el pago correctamente', 'Error', {timeOut: 3000});
        }
      }).render('#paypal-button-container');
    }, 1000); // Esperar 1 segundo
  }
    this.datoSesion = this.authService.getUserData();

    if (this.datoSesion) {
      this.idUsuario = this.datoSesion.id;
      this.idEmpresa = this.datoSesion.idEmpresa;
      this.idRol = this.datoSesion.idRol;
      this.idArea = this.datoSesion.idArea;

      if (this.idRol == 3) {
        this.mantenimientoService
        .obtenerMantenimientosIncompletosCliente(this.idUsuario)
        .subscribe((res) => {
          this.mantenimientos = res;

          this.dataSource.data = this.mantenimientos;
        });
      } else if (this.idRol == 2){
        this.router.navigate(['/mantenimiento']);
        return;
      } else {
        this.router.navigate(['/']);
      }
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
            this.mantenimientoService
            .obtenerMantenimientosIncompletosCliente(this.idUsuario)
            .subscribe((res) => {
              this.mantenimientos = res;

              this.dataSource.data = this.mantenimientos;
            });
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
      width: 'auto'
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

  openPaymentDialog(element: Mantenimiento) {
    this.idMantenimiento = element.id;
    this.costoMantenimiento = element.costo;
    this.dialogRef = this.dialog.open(this.paymentDialog, {
      width: 'auto',
    });
    this.ngOnInit()
  }

  realizarPago() {
    // Aquí estamos asumiendo que el pago se realiza exitosamente
    this.mantenimientoPago.id = this.idMantenimiento,
    this.mantenimientoPago.estadoPago = 'Pagado'
    this.mantenimientoService.modificarMantenimiento(this.mantenimientoPago.id, this.mantenimientoPago).subscribe(res =>{
      this.toastr.success('El pago ha sido realizado exitosamente.', 'Éxito');
      this.mantenimientoService
        .obtenerMantenimientosIncompletosCliente(this.idUsuario)
        .subscribe((res) => {
          this.mantenimientos = res;

          this.dataSource.data = this.mantenimientos;
        });
      this.dialogRef.close();
    },err =>{
      this.toastr.error('No se ha podido realizar el pago, inténtelo más tarde', 'Error');
    })
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
            this.mantenimientoService
            .obtenerSolicitudesCliente(this.idUsuario)
            .subscribe((res) => {
              this.mantenimientos = res;
              this.dataSource.data = this.mantenimientos;
            });
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
            this.mantenimientoService
            .obtenerMantenimientosIncompletosCliente(this.idUsuario)
            .subscribe((res) => {
              this.mantenimientos = res;

              this.dataSource.data = this.mantenimientos;
            });
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
            this.mantenimientoService
            .obtenerSolicitudesCliente(this.idUsuario)
            .subscribe((res) => {
              this.mantenimientos = res;
              this.dataSource.data = this.mantenimientos;
            });
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
