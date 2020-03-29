import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { PropiedadService } from 'app/services/propiedad.service';
import { PropietarioService } from 'app/services/propietario.service';
import { Propietario } from 'app/model/propietario';

@Component({
    selector: 'app-dialog-add-homeowner',
    templateUrl: 'dialog-add-homeowner.component.html'
})
export class DialogAddHomeOwnerComponent implements OnInit {
    @Input() editable: boolean ;
    @Input() enabled: boolean;
    public newPropietario: Propietario = {} as Propietario;
    constructor(
        public dialogRef: MatDialogRef<DialogAddHomeOwnerComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private propietarioService: PropietarioService) {}

      ngOnInit(){
      }

      onNoClick(): void {
        this.dialogRef.close({agregado: false});
      }

      addHomeOwner(nombre,correo,telefono,direccion,password,password2) {
        if(nombre && nombre !== ''){
          this.newPropietario.nombre = nombre;
        }else {
          alert('ingrese el nombre');
          return;
        }
        if(correo && correo !== ''){
          this.newPropietario.correo = correo;
        }else {
          alert('ingrese un correo');
          return ;
        }
        if(telefono && telefono !== ''){
          this.newPropietario.ntelefono = telefono;
        }else {
          alert('ingrese un telefono');
          return ;
        }
        if(direccion && direccion !== ''){
          this.newPropietario.direccion = direccion;
        }else {
          alert('ingrese un correo');
          return ;
        }
        if(!password && password == ''){
          alert('ingrese una contraseña');
          return;
        }
        if(!password2 && password2 == ''){
          alert('repita la contraseña');
          return;
        }
        if(password === password2){
          this.newPropietario.contraseña = password2;
        }else {
          alert('las contraseñas son iguales');
          return;
        }
        this.newPropietario.rol = "ROLE_PROPIETARIO";
        this.propietarioService.agregarPropietario(this.newPropietario)
        .subscribe(data=> {
          this.dialogRef.close({agregado: true});
        }, error=> {
          console.error(error);
          
        })
      }
}