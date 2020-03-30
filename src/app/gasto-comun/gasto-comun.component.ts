import { Component, OnInit, ViewChild, OnDestroy, OnChanges, SimpleChanges, Input, Inject } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GastoComun } from 'app/model/gastocomun';
import { GastoComunService } from 'app/services/gasto-comun.service';
import { DialogCreateGastoComun } from './DialogCreateGastoComun/dialog-create-gasto-comun.component';
import { DialogConfirmar } from 'app/list-houses/DialogSeeHomeowner/dialog-seehomeowner.component';
@Component({
  selector: 'app-gasto-comun',
  templateUrl: './gasto-comun.component.html',
  styleUrls: ['./gasto-comun.component.scss']
})
export class GastoComunComponent implements OnInit, OnDestroy, OnChanges {

  displayColumns: string[] = [ 'descripcion',  'monto', 'fecha', 'opciones']
  dataSource:  MatTableDataSource<GastoComun> = new MatTableDataSource<GastoComun>();
  gastos: GastoComun[] = [];
  page = 1;
  pageSize = 5;
  collectionSize = 0;
  image: any;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private gastoComunService: GastoComunService,
    private dialog: MatDialog) { }
  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit();
  }
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

  eliminarDocumento(element: GastoComun) {
    element.comprobante = null;
    this.gastoComunService.updateGastoComun(element)
    .subscribe(data => {
      this.ngOnInit();
    }, error => {
      console.log(error);
    })
  }

  onFileChange(event, gasto: GastoComun) {
    const dialogRef = this.dialog.open(SubiendoComponent);
    this.image = event.target.files[0];
    this.gastoComunService.uploadImage(gasto,this.image)
    .subscribe(porcentaje=> {
    }, error => {
      console.error(error);
    });
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

  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };

}
@Component({
  selector: 'app',
  template: '<mat-spinner></mat-spinner> <br> Subiendo...'
})
export class SubiendoComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogCreateGastoComun>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ){

  }

}