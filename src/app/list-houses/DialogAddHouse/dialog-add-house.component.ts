import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { DialogAddHomeOwnerComponent } from '../DialogAddHomeOwner/dialog-add-homeowner.component';
import { Propiedad } from 'app/model/propiedad';
import { PropiedadService } from 'app/services/propiedad.service';
import { PropietarioService } from 'app/services/propietario.service';
import { Propietario } from 'app/model/propietario';

@Component({
  selector: 'app-dialog-add-house',
  templateUrl: './dialog-add-house.component.html'
})

export class DialogAddHouseComponent implements OnInit {

  title: string;
  subtitle: string;
  titleButton: string;
  houseForm: FormGroup;
  houseDetails: Propiedad = {} as Propiedad;
  listPropietario: Propietario[] = [] as Propietario[];
  propietario : Propietario = {} as Propietario;
  constructor(
    public dialogRef: MatDialogRef<DialogAddHouseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private houseService: PropiedadService,
    private propietarioService: PropietarioService) {
    this.title = data.title;
    this.subtitle = data.subtitle;
    this.titleButton = data.titleButton;
    if (data.house) {
      this.houseDetails = data.house;
      this.houseForm = this.formBuilder.group({
        number: [this.houseDetails.numeroPropiedad, [Validators.required]],
        m2: [this.houseDetails.m2, Validators.required],
        propietario: [this.houseDetails.propietario, Validators.required]
      });
      this.propietario = this.houseDetails.propietario;
    } else {
      this.houseForm = this.formBuilder.group({
        number: ['', [Validators.required]],
        m2: ['', Validators.required],
        propietario: [null, Validators.required]
      });
    }

    

  }

  ngOnInit() {
    this.propietarioService.listPropietarios()
    .subscribe(data=> {
      if(data) {
        this.listPropietario = data;
      }
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };

  openAddHomeOwner() {
    const dialogRef = this.dialog.open(DialogAddHomeOwnerComponent, {
      data: {}
    })

    this.dialogRef.beforeClosed().subscribe(ok => {
      if (ok.agregado) {
        this.ngOnInit();
      }
    })
  }

  get propiedad() {
    return this.houseForm.controls;
  }

  onSubmit() {
    if(this.houseForm.invalid){
      return;
    }
    this.houseDetails.m2 = this.propiedad.m2.value;
    this.houseDetails.numeroPropiedad = this.propiedad.number.value;
    this.houseDetails.propietario = this.propiedad.propietario.value;

    this.houseService.agregarPropiedad(this.houseDetails)
    .subscribe(data=> {
      console.log(data);
      this.dialogRef.close({agregado: true})
    }, error=> {
      console.error(error);
      
    })
    
  }
}

