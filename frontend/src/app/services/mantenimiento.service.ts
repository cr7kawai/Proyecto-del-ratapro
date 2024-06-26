import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mantenimiento } from '../models/mantenimiento.interface';

@Injectable({
  providedIn: 'root'
})
export class MantenimientoService {

  private apiUrl = 'http://localhost:3000/api/mantenimiento';

  constructor(private http: HttpClient) { }

  // Obtener mantenimientos por área
  obtenerMantenimientosArea(idArea: any): Observable<Object[]> {
    const url = `${this.apiUrl}/area/${idArea}`;
    return this.http.get<Object[]>(url);
  }

  // Obtener mantenimientos completados para cliente
  obtenerMantenimientosCompletosCliente(idCliente: any): Observable<Mantenimiento[]> {
    const url = `${this.apiUrl}/completos/cliente/${idCliente}`;
    return this.http.get<Mantenimiento[]>(url);
  }

  // Obtener mantenimientos completados para empleado
  obtenerMantenimientosCompletosEmpleado(idEmpleado: any): Observable<Mantenimiento[]> {
    const url = `${this.apiUrl}/completos/empleado/${idEmpleado}`;
    return this.http.get<Mantenimiento[]>(url);
  }

  // Obtener mantenimientos incompletos para cliente
  obtenerMantenimientosIncompletosCliente(idCliente: any): Observable<Mantenimiento[]> {
    const url = `${this.apiUrl}/incompletos/cliente/${idCliente}`;
    return this.http.get<Mantenimiento[]>(url);
  }

  // Obtener mantenimientos incompletos para empleado
  obtenerMantenimientosIncompletosEmpleado(idEmpleado: any): Observable<Mantenimiento[]> {
    const url = `${this.apiUrl}/incompletos/empleado/${idEmpleado}`;
    return this.http.get<Mantenimiento[]>(url);
  }

  // Obtener solicitudes de mantenimientos para cliente
  obtenerSolicitudesCliente(idCliente: any): Observable<Mantenimiento[]> {
    const url = `${this.apiUrl}/solicitudes/cliente/${idCliente}`;
    return this.http.get<Mantenimiento[]>(url);
  }

  // Obtener solicitudes de mantenimientos para empleado
  obtenerSolicitudesEmpleado(idEmpleado: any): Observable<Mantenimiento[]> {
    const url = `${this.apiUrl}/solicitudes/empleado/${idEmpleado}`;
    return this.http.get<Mantenimiento[]>(url);
  }

  // Ver detalles de un mantenimiento
  verMantenimiento(id: any): Observable<Mantenimiento> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Mantenimiento>(url);
  }

  // Registrar un mantenimiento
  registrarMantenimiento(mantenimiento: Mantenimiento): Observable<any> {
    return this.http.post<any>(this.apiUrl, mantenimiento);
  }

  // Modificar un mantenimiento
  modificarMantenimiento(id: any, mantenimiento: Mantenimiento): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<any>(url, mantenimiento);
  }

  // Aceptar un mantenimiento
  aceptarMantenimiento(id: any, costo: any, fechaFin: any): Observable<any> {
    const url = `${this.apiUrl}/aceptar/${id}/${costo}/${fechaFin}`;
    return this.http.put<any>(url, {});
  }

  // Rechazar un mantenimiento
  rechazarMantenimiento(id: any): Observable<any> {
    const url = `${this.apiUrl}/rechazar/${id}`;
    return this.http.put<any>(url, {});
  }

  // Terminar un mantenimiento
  terminarMantenimiento(id: any): Observable<any> {
    const url = `${this.apiUrl}/terminar/${id}`;
    return this.http.put<any>(url, {});
  }

  // Cancelar un mantenimiento
  cancelarMantenimiento(id: any): Observable<any> {
    const url = `${this.apiUrl}/cancelar/${id}`;
    return this.http.put<any>(url, {});
  }

  // Eliminar un mantenimiento
  eliminarMantenimiento(id: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url);
  }
}
