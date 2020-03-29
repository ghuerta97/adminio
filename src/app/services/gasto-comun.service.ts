import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { GastoComun } from 'app/model/gastocomun';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GastoComunService {

  constructor(private http: HttpClient) { }

  createGastoComun(gasto: GastoComun): Observable<GastoComun> {
    return this.http.post<GastoComun>(environment.api+'/admin/gasto_comun/agregar', gasto);
  }

  listAllGastoComunes(): Observable<GastoComun[]> {

      return this.http.get<GastoComun[]>(environment.api+'/admin/gasto_comun/historico');
    
  }

  getObtenerGastoComun(id: number): Observable<GastoComun> {
    return this.http.get<GastoComun>(environment.api+'/admin/gasto_comun/get_gasto_comun?id='+id);
  }

  updateGastoComun(gasto: GastoComun): Observable<any> {
    return this.http.post<any>(environment.api+'/admin/gasto_comun/editar', gasto);
  }

  deleteGastoComun(id: number): Observable<any> {
    return this.http.post<any>(environment.api+'/admin/gasto_comun/eliminar',{id: id});
  }

  saveDocumento(id_gasto: number, archivo: string){
    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id",''+id_gasto);

    const req = new HttpRequest('POST',environment.api+'/admin/gasto_comun/upload',formData, {
      reportProgress: true,
     
    })

    return this.http.request(req);
  }

}
