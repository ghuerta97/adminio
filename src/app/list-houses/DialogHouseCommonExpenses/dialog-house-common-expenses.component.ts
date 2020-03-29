import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { Router } from "@angular/router";
import { state } from "@angular/animations";
import { Boleta } from "app/model/boleta";
import { BoletaService } from "app/services/boleta.service";
import { GastoComunService } from "app/services/gasto-comun.service";

@Component({
    selector: 'dialog-house-common-expenses',
    templateUrl: './dialog-house-common-expenses.html'
})

export class DialogHouseCommonExpenses implements OnInit{
  public total:number = 0;
    constructor(
        public dialogRef: MatDialogRef<DialogHouseCommonExpenses>,
        @Inject(MAT_DIALOG_DATA) public data: Boleta,
        public route: Router,
        private gastoComunService: GastoComunService ) {
          this.total = data.valor;
          console.log(data);
        }
    
        ngOnInit() {
          
        }
      onNoClick(): void {
        this.dialogRef.close();
      }

      payTotal(){
        this.gastoComunService.pagar(this.data.id)
        .subscribe(data=> {
          this.dialogRef.close({pagada: true});
        })
        
        
        
      }
      payMount(mount){
        this.dialogRef.close();
       
      }

      onFileInput(event) {
        console.log(event);
      }
}