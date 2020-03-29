import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Boleta } from "app/model/boleta";
import { environment } from "environments/environment";

@Injectable({
    providedIn: 'root'
})
export class BoletaService {
    constructor(private http: HttpClient) {

    }

    obtenerBoleta(id: number): Observable<Boleta> {
        return this.http.get<Boleta>(environment.api+'/admin/propiedades/boleta?id='+id);
    }

    listBoletahistorico(id: number): Observable<Boleta[]> {
        return this.http.get<Boleta[]>(environment.api+'/admin/propiedades/boleta/historico?id='+id);
    }

    pagoBoleta(boleta: Boleta): Observable<any> {
        return this.http.post<any>(environment.api+'/admin/propiedades/boleta/pago', boleta);
    }

    configuraBoleta(configuracion: string): Observable<any> {
        return this.http.post<any>(environment.api+'/admin/configuracion/cambiar',{configuracion: configuracion});
    }
}