import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empresa } from '../models/empresa.interface';

@Injectable({
  providedIn: 'root',
})
export class EmpresaService {
  API_URI = 'http://localhost:3000/api/empresa';

  constructor(private http: HttpClient) {}

  obtenerEmpresas(): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(`${this.API_URI}`);
  }

  filtrarEmpresa(id_empresa: any) {
    return this.http.get(`${this.API_URI}/${id_empresa}`);
  }

  registrarEmpresa(empresa: Empresa) {
    return this.http.post(`${this.API_URI}/`, empresa);
  }

  modificarEmpresa(
    id_empresa: any,
    empresaActualizada: Empresa
  ): Observable<Object> {
    return this.http.put(`${this.API_URI}/${id_empresa}`, empresaActualizada);
  }

  eliminarNota(id_empresa: any) {
    return this.http.delete(`${this.API_URI}/${id_empresa}`);
  }
}
