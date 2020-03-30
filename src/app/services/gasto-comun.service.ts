import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { GastoComun } from 'app/model/gastocomun';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GastoComunService {

  private filePath: any;
  private downloadURL: Observable<string> ;

  constructor(private http: HttpClient,
    private storage: AngularFireStorage) { }

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

  deleteGastoComun(id: number): Observable<boolean> {
    return this.http.get<boolean>(environment.api+'/admin/gasto_comun/eliminar?id='+id,{});
  }

  public uploadImage(gasto: GastoComun, imagen): Observable<number>{
    this.filePath = 'documentos/'+gasto.id;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath,imagen);
    task.snapshotChanges()
    .pipe(
      finalize(()=> {
        fileRef.getDownloadURL()
        .subscribe(
          urlImagen=> {
            this.downloadURL = urlImagen;
            gasto.comprobante = ''+urlImagen;
            console.log(gasto);
            this.updateGastoComun(gasto).subscribe(data => {location.reload()});
          }
        )
      })
    ).subscribe()
    return task.percentageChanges();
  }

  pagar(id:number){
    return this.http.post<any>(environment.api+'/admin/propiedades/boleta/pago?id='+id,{})
  }

}
