import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comentario } from '../models/comentario.interface';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  private apiUrl = 'http://localhost:3000/api/comentario';

  constructor(private http: HttpClient) { }

  // Obtener comentarios de un mantenimiento
  obtenerComentarios(idMantenimiento: any): Observable<Comentario[]> {
    const url = `${this.apiUrl}/${idMantenimiento}`;
    return this.http.get<Comentario[]>(url);
  }

  // Ver detalles de un comentario
  verComentario(id: any): Observable<Comentario> {
    const url = `${this.apiUrl}/verComentario/${id}`;
    return this.http.get<Comentario>(url);
  }

  // Registrar un comentario
  registrarComentario(comentario: Comentario): Observable<any> {
    return this.http.post<any>(this.apiUrl, comentario);
  }

  // Modificar un comentario
  modificarComentario(id: any, comentario: Comentario): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<any>(url, comentario);
  }

  // Eliminar un comentario
  eliminarComentario(id: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url);
  }
}
