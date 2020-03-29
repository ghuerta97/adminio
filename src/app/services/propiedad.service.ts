import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Propiedad } from 'app/model/propiedad';
import { environment } from 'environments/environment';
import { GastoComun } from 'app/model/gastocomun';

@Injectable({
  providedIn: 'root'
})
export class PropiedadService {

  constructor(private http: HttpClient) { }

  agregarPropiedad(propiedad: Propiedad): Observable<any> {
    return this.http.post<any>(environment.api+'/admin/propiedades/agregar',propiedad);
  }

  listPropiedades(): Observable<Propiedad[]>{
    return this.http.get<Propiedad[]>(environment.api+'/admin/propiedades');
  }

  obtenerPropiedad(id: number): Observable<Propiedad>{
    return this.http.get<Propiedad>(environment.api+'/admin/propiedades /get_propiedad?id='+id);
  }

  updatePropiedad(propiedad: Propiedad){
    return this.http.post<any>(environment.api+'/admin/propiedades/editar', propiedad)
  }

  deletePropiedad(id: number) {
    this.http.post<any>(environment.api+'/admin/propiedades/eliminar', {id: id})
  }

  

}
