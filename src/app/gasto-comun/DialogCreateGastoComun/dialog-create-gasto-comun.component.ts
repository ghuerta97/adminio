import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatSpinner } from "@angular/material";
import { Inject, Component, OnInit } from "@angular/core";
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { GastoComun } from "app/model/gastocomun";
import { GastoComunService } from "app/services/gasto-comun.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { finalize } from 'rxjs/operators';
import { SubiendoComponent } from "../gasto-comun.component";
@Component({
  selector: 'app-dialog-add-gasto-comun',
  templateUrl: 'dialog-create-gasto-comun.component.html',
  styleUrls: ['dialog-create-gasto-comun.component.scss'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'fr' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS }
  ],

})
export class DialogCreateGastoComun implements OnInit {
  newGastoComun: GastoComun = {} as GastoComun;
  public gastoComunForm: FormGroup;
  imagenSave: any;
  constructor(
    public dialogRef: MatDialogRef<DialogCreateGastoComun>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private gastoComunService: GastoComunService,
    private formBuilder: FormBuilder,
    public dialog : MatDialog
  ) { }

  ngOnInit() {
    this.gastoComunForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      monto: ['', [Validators.required]],
      fechaVencimiento: ['', [Validators.required]],
      documento: ['', []]
    })
  }

  get gastoComun() { return this.gastoComunForm.controls }


  saveGastoComun() {

    if (this.gastoComunForm.valid) {
      this.newGastoComun.descripcion = this.gastoComun.name.value;
      this.newGastoComun.valor = this.gastoComun.monto.value;
      this.newGastoComun.fechaPago = this.gastoComun.fechaVencimiento.value;
      console.log(this.newGastoComun);
      
      this.gastoComunService.createGastoComun(this.newGastoComun)
        .subscribe(data => {
          console.log(data);
          const dia = this.dialog.open(SubiendoNuevoComponent);
          this.gastoComunService.uploadImage(data, this.imagenSave)
          .subscribe(porcentaje=> {
            console.log(porcentaje)
            // const por = Math.round(porcentaje);
            // console.log(por);
            // if(por === 100){
              dia.close();
              this.dialogRef.close({ status: true });
            // }
          });
          
        }, error => {
          this.dialogRef.close({ status: false })
        })
    }
    return;
  }
  onFileChange(event) {
    this.imagenSave = event.target.files[0];
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
@Component({
  selector: 'app',
  template: '<mat-spinner></mat-spinner> <br> Subiendo...'
})
export class SubiendoNuevoComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogCreateGastoComun>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ){

  }

}