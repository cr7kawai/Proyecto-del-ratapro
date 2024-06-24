import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.inteface';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = 'http://localhost:3000/api/usuarios';

  constructor(private http: HttpClient) { }

  // Obtener todos los usuarios
  getUsuarios(idEmpresa: any): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/${idEmpresa}`);
  }

  // Obtener un usuario por ID
  getUsuario(id: number): Observable<Usuario> {
    const url = `${this.apiUrl}/verUsuario${id}`;
    return this.http.get<Usuario>(url);
  }

  // Obtener usuarios por área
  obtenerEmpleadosArea(idArea: number): Observable<Usuario[]> {
    const url = `${this.apiUrl}/empleadosArea/${idArea}`;
    return this.http.get<Usuario[]>(url);
  }

  // Obtener credenciales de un usuario
  obtenerCredenciales(id: number): Observable<any> {
    const url = `${this.apiUrl}/credenciales/${id}`;
    return this.http.get<any>(url);
  }

  // Obtener un usuario por email
  obtenerUsuarioEmail(email: string): Observable<Usuario> {
    const url = `${this.apiUrl}/getByEmail/${email}`;
    return this.http.get<Usuario>(url);
  }

  // Registrar un nuevo usuario
  registrarUsuario(usuario: Usuario): Observable<any> {
    return this.http.post<any>(this.apiUrl, usuario);
  }

  // Modificar un usuario existente
  modificarUsuario(id: any, usuarioActualizado: Usuario): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<any>(url, usuarioActualizado);
  }

  // Eliminar un usuario
  eliminarUsuario(id: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url);
  }

  // Enviar email de confirmación para cambio de contraseña
  enviarEmailConfirmacion(email: string): Observable<any> {
    const url = `${this.apiUrl}/password/${email}`;
    return this.http.get<any>(url);
  }

  // Cambiar contraseña de un usuario
  cambiarContrasena(id: any, email: string, usuarioActualizado: Usuario): Observable<any> {
    const url = `${this.apiUrl}/password/${id}/${email}`;
    return this.http.put<any>(url, usuarioActualizado);
  }

  // Validar email y teléfono
  validarEmailTel(usuario: Usuario): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/validarEmailTel`, usuario);
  }

  // Iniciar sesión (registro y cambio de suscripción)
  inicioSesion(usuario: Usuario): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/inicio_sesion`, usuario);
  }

  // Login normal
  login(usuario: Usuario): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, usuario);
  }

  // Verificar OTP
  verifyOtp(otp: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/verify-otp`, otp);
  }
}
