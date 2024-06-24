import {
  AfterViewInit,
  Component,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Usuario } from '../../models/usuario.inteface';
import { Area } from '../../models/area.interface';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
})
export class UsuarioComponent implements AfterViewInit {
  @ViewChild('addUserDialog') addUserDialog!: TemplateRef<any>;
  @ViewChild('editUserDialog') editUserDialog!: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    'nombre',
    'apePaterno',
    'apeMaterno',
    'email',
    'telefono',
    'fechaNac',
    'areaFk',
    'acciones',
  ];
  dataSource = new MatTableDataSource<Usuario>([]);

  addUserForm: FormGroup;
  editUserForm: FormGroup;
  dialogRef!: MatDialogRef<any>;
  areas: Area[] = [
    { id: 1, nombre: 'Área 1', descripcion: 'Descripción del Área 1' },
    { id: 2, nombre: 'Área 2', descripcion: 'Descripción del Área 2' },
  ];

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private usuarioService: UsuarioService
  ) {
    this.addUserForm = this.fb.group(
      {
        nombre: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50),
          ],
        ],
        apePaterno: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50),
          ],
        ],
        apeMaterno: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50),
          ],
        ],
        fechaNac: ['', [Validators.required, this.fechaNacimientoValidator]],
        areaFk: ['', Validators.required],
        email: [
          '',
          [Validators.required, Validators.email, this.emailValidator],
        ],
        telefono: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(16),
            this.passwordValidator,
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      { validator: this.passwordMatchValidator }
    );

    this.editUserForm = this.fb.group({
      id: [''],
      nombre: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      apePaterno: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      apeMaterno: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      fechaNac: ['', [Validators.required, this.fechaNacimientoValidator]],
      areaFk: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, this.emailValidator]],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loadUsuarios();
  }

  loadUsuarios() {
    this.usuarioService.getUsuarios().subscribe(
      (usuarios) => {
        this.dataSource.data = usuarios;
      },
      (error) => {
        this.toastr.error('Error al cargar los usuarios', 'Error');
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openUserDialog(): void {
    this.dialogRef = this.dialog.open(this.addUserDialog, {
      width: '700px',
      panelClass: 'custom-dialog-container',
    });
  }

  openEditUserDialog(user: Usuario): void {
    this.editUserForm.patchValue(user);
    this.dialogRef = this.dialog.open(this.editUserDialog, {
      width: '700px',
      panelClass: 'custom-dialog-container',
    });
  }

  saveUser(): void {
    if (this.addUserForm.valid) {
      const formValue = this.addUserForm.value;
      const newUser: Usuario = {
        nombre: formValue.nombre,
        apePaterno: formValue.apePaterno,
        apeMaterno: formValue.apeMaterno,
        fechaNac: formValue.fechaNac,
        areaFk: formValue.areaFk,
        email: formValue.email,
        telefono: formValue.telefono,
        password: formValue.password,
        rolFk: 2,
        empresaFk: 1,
      };
      this.usuarioService.registrarUsuario(newUser).subscribe(
        (response) => {
          this.toastr.success('Usuario registrado exitosamente');
          this.loadUsuarios();
          this.addUserForm.reset();
          this.dialogRef.close();
        },
        (error) => {
          this.toastr.error('Error al registrar el usuario', 'Error');
        }
      );
    }
  }

  updateUser(): void {
    if (this.editUserForm.valid) {
      const updatedUser = this.editUserForm.value;
      this.usuarioService
        .modificarUsuario(updatedUser.id, updatedUser)
        .subscribe(
          (response) => {
            this.toastr.success('Usuario actualizado exitosamente');
            this.loadUsuarios();
            this.editUserForm.reset();
            this.dialogRef.close();
          },
          (error) => {
            this.toastr.error('Error al actualizar el usuario', 'Error');
          }
        );
    }
  }

  passwordMatchValidator(
    group: AbstractControl
  ): { [key: string]: any } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  emailValidator(control: AbstractControl): { [key: string]: any } | null {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(control.value) ? null : { invalidEmail: true };
  }

  fechaNacimientoValidator(
    control: AbstractControl
  ): { [key: string]: any } | null {
    const fechaNacimiento = new Date(control.value);
    const fechaActual = new Date();
    return fechaNacimiento < fechaActual ? null : { invalidDate: true };
  }

  passwordValidator(control: AbstractControl): { [key: string]: any } | null {
    const hasUpperCase = /[A-Z]/.test(control.value);
    const hasLowerCase = /[a-z]/.test(control.value);
    const hasNumbers = /[0-9]/.test(control.value);
    const hasSpecialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(
      control.value
    );
    return hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChars
      ? null
      : { invalidPassword: true };
  }

  editUser(user: Usuario): void {
    this.openEditUserDialog(user);
  }

  deleteUser(user: Usuario): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Estás seguro de que deseas eliminar a ${user.nombre} ${user.apePaterno}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminarUsuario(user.id).subscribe(
          (response) => {
            this.toastr.success('Empleado eliminado exitosamente');
            this.loadUsuarios();
          },
          (error) => {
            this.toastr.error('Error al eliminar el usuario', 'Error');
          }
        );
      }
    });
  }
}
