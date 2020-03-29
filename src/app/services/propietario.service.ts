import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Propietario } from "app/model/propietario";
import { environment } from "environments/environment";

@Injectable({
    providedIn: 'root'
})
export class PropietarioService {

    constructor(private http: HttpClient) {

    }

    listPropietarios() : Observable<Propietario[]>{
        return this.http.get<any>(environment.api+'/admin/propietarios');
    }

    obtenerPropietario(id: number): Observable<Propietario> {
        return this.http.get<any>(environment.api+'/admin/propietario?id='+id);
    }

    

    agregarPropietario(propietario: Propietario){
        return this.http.post<any>(environment.api+'/admin/propietario/agregar',propietario)
    }

    updatePropietario(propietario: Propietario) {
        return this.http.post<any>(environment.api+'/admin/propietario/actualizar', propietario);
    }

    deletePropietario(id: number){
        return this.http.get<any>(environment.api+'/admin/propietario/delete?id='+id);
    }


}