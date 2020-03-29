import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { Propietario } from 'app/model/propietario';
import { PropietarioService } from 'app/services/propietario.service';

@Component({
    selector: 'app-dialog-see-homeowner',
    templateUrl: 'dialog-seehomeowner.component.html'
})

export class DialogSeeHomeOwnerComponent {
  enabled: boolean = true;
    constructor(
        public dialogRef: MatDialogRef<DialogSeeHomeOwnerComponent>,
        public dialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) public data: Propietario,
        private propietarioService: PropietarioService) {
          console.log(data);
        }

      ngOnInit(){
      }

      onNoClick(): void {
        this.dialogRef.close();
      }

      updatedEnabled(enabled) {
        if(enabled){
          return  false;
        }else {
          return true;
        }
      }

      save(nombre,correo,telefono,direccion) {
        if(nombre && nombre !== '' ){
          this.data.nombre = nombre;
        }
        if(correo && correo !== '') {
          this.data.correo = correo;
        }
        if(telefono &&telefono !== '') {
          this.data.ntelefono = telefono;
        }
        if(direccion && direccion !== ''){
          this.data.direccion = direccion;
        }
        console.log(this.data);
        this.propietarioService.agregarPropietario(this.data)
        .subscribe(data=> {
          this.dialogRef.close();
        }, error=> {

        })
      }

      eliminarPropietario() {
        const dialogRef = this.dialog.open(DialogConfirmar);
        dialogRef.beforeClosed()
        .subscribe(data => {
          if(data.ok){
            this.propietarioService.deletePropietario(this.data.id)
            .subscribe(data=> {
              var id = this.data.id;
              this.data = {} as Propietario;
              this.data.id = id;
            }, error => {

            })
          }
        })
      }
}

@Component({
  selector: 'dialog-confirmar',
  templateUrl: 'dialog-confirmar.html'
})
export class DialogConfirmar {
  
  constructor(public dialogRef: MatDialogRef<DialogSeeHomeOwnerComponent>){

  }
 cerrar(){
  this.dialogRef.close({ok: false})
 }

 confirmar() {
   this.dialogRef.close({ok: true})
 }
}