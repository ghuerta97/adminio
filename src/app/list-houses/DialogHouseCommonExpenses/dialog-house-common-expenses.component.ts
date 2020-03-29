import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { Router } from "@angular/router";
import { state } from "@angular/animations";
import { Boleta } from "app/model/boleta";

@Component({
    selector: 'dialog-house-common-expenses',
    templateUrl: './dialog-house-common-expenses.html'
})

export class DialogHouseCommonExpenses implements OnInit{
  public total:number = 0;
    constructor(
        public dialogRef: MatDialogRef<DialogHouseCommonExpenses>,
        @Inject(MAT_DIALOG_DATA) public data: Boleta,
        public route: Router) {
          this.total = data.valor;
          console.log(data);
        }
    
        ngOnInit() {
          
        }
      onNoClick(): void {
        this.dialogRef.close();
      }

      payTotal(){
        this.dialogRef.close();
        this.route.navigate(['payment'],{state: {'mount': this.total}});
      }
      payMount(mount){
        this.dialogRef.close();
        this.route.navigate(['payment'],{state: {'mount': mount}})
      }

      onFileInput(event) {
        console.log(event);
      }
}