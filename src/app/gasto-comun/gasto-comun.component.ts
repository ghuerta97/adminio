import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { GastoComun } from 'app/model/gastocomun';
import { GastoComunService } from 'app/services/gasto-comun.service';
import { DialogCreateGastoComun } from './DialogCreateGastoComun/dialog-create-gasto-comun.component';
import { DialogConfirmar } from 'app/list-houses/DialogSeeHomeowner/dialog-seehomeowner.component';

@Component({
  selector: 'app-gasto-comun',
  templateUrl: './gasto-comun.component.html',
  styleUrls: ['./gasto-comun.component.scss']
})
export class GastoComunComponent implements OnInit, OnDestroy {

  displayColumns: string[] = [ 'descripcion',  'monto', 'fecha', 'opciones']
  dataSource:  MatTableDataSource<GastoComun> = new MatTableDataSource<GastoComun>();
  gastos: GastoComun[] = [];
  page = 1;
  pageSize = 4;
  collectionSize = 0;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private gastoComunService: GastoComunService,
    private dialog: MatDialog) { }
  ngOnDestroy(): void {
    
  }


  ngOnInit() {
    this.gastoComunService.listAllGastoComunes()
    .subscribe(data => {
      console.log(data);
      this.gastos = data;
      this.collectionSize = this.gastos2.length;
      this.dataSource = new MatTableDataSource<GastoComun>(data);
      this.dataSource.paginator = this.paginator;
    }, error => {
      console.error(error);
    }
    )
  }

  get gastos2() {
    return this.gastos.map((country, i) => ({id: i + 1, ...country}))
    .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  openCreateGastoComun() {
    let obj =   this.dialog.open(DialogCreateGastoComun, {
      
    })

    obj.afterClosed().subscribe(data=> {
      if(data.status) {
        this.ngOnInit();
      }
    })
  }

  eliminarDocumento(element) {
    element.documento = null;
    this.gastoComunService.createGastoComun(element)
    .subscribe(data => {

    }, error => {
      console.log(error);
    })
  }

  onFileChange(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      console.log(file);
      reader.readAsDataURL(file);
      console.log(reader);
      reader.onload = () => {
       console.log(reader.result)
      };
    }
  }

  deleteComonExpenses(id) {
    const dialogRef = this.dialog.open(DialogConfirmar);
    dialogRef.beforeClosed().
    subscribe(data=> {
      if(data.ok) {
        this.gastoComunService.deleteGastoComun(id)
        .subscribe(data=> {
          if(data) {
            console.log('eleminado');
          } else {
            alert('El gasto a una boleta');
          }
        })
      }
    })
  }

}
