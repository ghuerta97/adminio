import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "environments/environment";
import { Configuration } from "app/model/configuracion";

@Injectable({
    providedIn: 'root'
})
export class ConfigurationService {
    constructor(private http: HttpClient){}

    configuraBoleta(configuracion: Configuration): Observable<any> {
        return this.http.post<any>(environment.api+'/admin/configuracion',configuracion);
    }

    obtenerConfiguracion(): Observable<Configuration>{
        return this.http.get<Configuration>(environment.api+'/admin/configuration')
    }
}