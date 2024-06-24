import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Area } from '../models/area.interface';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  private apiUrl = 'http://localhost:3000/api/area';

  constructor(private http: HttpClient) { }

  // Obtener áreas de una empresa
  obtenerAreas(idEmpresa: number): Observable<Area[]> {
    const url = `${this.apiUrl}/${idEmpresa}`;
    return this.http.get<Area[]>(url);
  }

  // Ver detalles de un área
  verArea(id: number): Observable<Area> {
    const url = `${this.apiUrl}/verArea/${id}`;
    return this.http.get<Area>(url);
  }

  // Registrar un área
  registrarArea(area: Area): Observable<any> {
    return this.http.post<any>(this.apiUrl, area);
  }

  // Modificar un área
  modificarArea(id: number, area: Area): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<any>(url, area);
  }

  // Eliminar un área
  eliminarArea(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url);
  }
}
