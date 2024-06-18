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

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  getUsuario(id: number): Observable<Usuario> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Usuario>(url);
  }

  obtenerUsuarioEmail(email: string): Observable<Usuario>{
    const url = `${this.apiUrl}/getByEmail/${email}`;
    return this.http.get<Usuario>(url);
  }

  enviarEmailConfirmacion(email: string): Observable<Usuario>{
    const url = `${this.apiUrl}/password/${email}`;
    return this.http.get<Usuario>(url);
  }

  /*addUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, usuario);
  }

  updateUsuario(id: number, usuario: Usuario): Observable<Usuario> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Usuario>(url, usuario);
  }

  deleteUsuario(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }*/


}