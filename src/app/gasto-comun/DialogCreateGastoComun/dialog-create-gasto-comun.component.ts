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
import { Cloudinary } from '@cloudinary/angular-5.x'; 
import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';
@Component({
  selector: 'app-dialog-add-gasto-comun',
  templateUrl: 'dialog-create-gasto-comun.component.html',
  styleUrls:['dialog-create-gasto-comun.component.scss'],
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
  public gastoComunForm : FormGroup;
  uploader: CloudinaryUploader = new CloudinaryUploader(
    new CloudinaryOptions({ cloudName: 'hxdxptasm', 
    uploadPreset: 'ml_default', })
    );
    res;
  constructor(
    public dialogRef: MatDialogRef<DialogCreateGastoComun>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private gastoComunService: GastoComunService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private cloudinary: Cloudinary,
    ) { }

    ngOnInit() {
      this.gastoComunForm = this.formBuilder.group({
        name: ['', [Validators.required]],
        monto: ['', [Validators.required]],
        fechaVencimiento: ['', [Validators.required]],
        documento: ['',[Validators.required]]
      })
    }

    get gastoComun() { return this.gastoComunForm.controls}


    saveGastoComun() {
      
      if(this.gastoComunForm.valid) {
        this.newGastoComun.descripcion = this.gastoComun.name.value;
        this.newGastoComun.valor = this.gastoComun.monto.value;
        this.newGastoComun.fechaPago = this.gastoComun.fechaVencimiento.value;
        console.log(this.newGastoComun);
        this.gastoComunService.createGastoComun(this.newGastoComun)
        .subscribe(data => {
          var documento = this.gastoComun.documento.value.split(';')[1].split(',')[1];
          console.log(documento);
          
          this.gastoComunService.saveDocumento(data.id, this.gastoComun.documento.value)
          .pipe(finalize(()=>{
            console.log(true)
          }))
          .subscribe(data=> {
            console.log(data);
          })
          // this.dialogRef.close({ status: true})
        }, error => {
          // this.dialogRef.close({status: false})
        })
      }
      return;
    }
    onFileChange(event) {
      let reader = new FileReader();
      if(event.target.files && event.target.files.length) {
        const [file] = event.target.files;
        console.log(file);
        reader.readAsDataURL(file);
        console.log(reader);
        reader.onload = () => {
          
          this.gastoComunForm.patchValue({
            documento: reader.result
          });
        };
      }
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  upload(){
    this.uploader.uploadAll();
    this.uploader.onSuccessItem = 
    (item: any, response: string, status: number, headers: any): any => {
      this.res = JSON.parse(response);
      
      console.log(this.res);
    }
      this.uploader.onErrorItem = function(fileItem, response, status, headers) {
        console.info('onErrorItem', fileItem, response, status, headers);
      }
      ;
    }
}