import { Component, OnInit, ViewChild, Inject, Input, OnChanges } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import {MatDialog} from '@angular/material/dialog';
import { DialogOverviewHouseDetails } from './DialogOverviewHouseDetails/dialog-overview-house-details.component';
import { DialogHouseCommonExpenses } from './DialogHouseCommonExpenses/dialog-house-common-expenses.component';
import { DialogAddHouseComponent } from './DialogAddHouse/dialog-add-house.component';
import { DialogSeeHomeOwnerComponent } from './DialogSeeHomeowner/dialog-seehomeowner.component';
import { Propietario } from 'app/model/propietario';
import { Propiedad } from 'app/model/propiedad';
import { PropiedadService } from 'app/services/propiedad.service';
import { Boleta } from 'app/model/boleta';
@Component({
  selector: 'app-list-houses',
  templateUrl: './list-houses.component.html',
  styleUrls: ['./list-houses.component.scss']
})
export class ListHousesComponent implements OnInit {

  displayedColumns: string[] = ['position', 'action1'];
  dataSource: MatTableDataSource<Propiedad> = new MatTableDataSource<Propiedad>();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  fabButtons: any;
  visibleDelete: boolean = false;
  masterChecked = false;
  checkedSelect = false;
  deletesHouses: Propiedad[] = [];
  propiedades: Propiedad[] = [];
  indeterCheckbox1 = false;
  position = 0;

  page = 1;
  pageSize = 4;
  collectionSize = 0;

  get houses(): Propiedad[] {
    return this.propiedades
      .map((country, i) => ({id: i + 1, ...country}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  set houses(houses) {
    this.propiedades = houses;
  }
  constructor(public dialog: MatDialog,
    private propiedadService: PropiedadService){
      this.propiedadService.listPropiedades()
    .subscribe(data=> {
      this.houses =  data;
      console.log(data);
      this.dataSource = new MatTableDataSource<Propiedad>(this.houses);
      this.dataSource.paginator = this.paginator;
      this.collectionSize = this.propiedades.length;
    })
  }

  get data(): MatTableDataSource<Propiedad> {
    return  new MatTableDataSource<Propiedad>(this.propiedades);
  }

  set data(dataSource) {
    this.data = dataSource; 
  }

  ngOnInit() {
    
    this.fabButtons = [
      {
        name: 'Add House',
        icon: 'add',
        action: function(dialog: MatDialog): any {
          const dialogRef = dialog.open(DialogAddHouseComponent, {
            width: '600px',
            height: '445px',
            data: { title: 'Add House', subtitle: 'Formulario de ingreso', titleButton: 'Add'}
          });
          dialogRef.afterClosed().subscribe(result =>{
            console.log('Ha cerrado Dialog Add House')
          });
        }
      },
      {
        name: 'Eliminar Houses',
        icon: 'delete',
        action: function(visibleDelete: boolean) {
          switch (visibleDelete) {
            case true:
              return false;
            case false:
              return true;
            default:
              return undefined;
          }
        }
      }
    ];
    
    
    this.dataSource.filterPredicate = (data: Propiedad, filter: string) => { return data.numeroPropiedad.toString().indexOf(filter) != -1; };
  }


  cancelDelete(algo,masterChecked){
    this.allCheckboxPage(masterChecked);
  }

  deleteHouses(){
    let newELEMENT_DATA = [];
    for (let i = 0;  i < this.propiedades.length; i++) {
        for (let j = 0; j  < this.deletesHouses.length; j++) {
          if(this.propiedades[i].numeroPropiedad === this.deletesHouses[j].numeroPropiedad ){
            return;
          }else if(this.propiedades[i].numeroPropiedad !== this.deletesHouses[j].numeroPropiedad && j === this.propiedades.length ) {
            newELEMENT_DATA.push(this.propiedades[i])
          }
        }
    }
    console.log(newELEMENT_DATA);
    this.dataSource = new MatTableDataSource<Propiedad>(this.propiedades);
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = (data: Propiedad, filter: string) => { return data.numeroPropiedad.toString().indexOf(filter) != -1; };
  }

  allCheckboxPage(checked){
    if(!this.indeterCheckbox1) {
      for (let house of this.propiedades) {
        house.checked = checked;
      if (checked) {
        this.deletesHouses = this.propiedades;
      } else {
        this.deletesHouses = [];
      }
      }
      console.log(this.deletesHouses);
      this.dataSource = new MatTableDataSource<Propiedad>(this.propiedades);
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = (data: Propiedad, filter: string) => { return data.numeroPropiedad.toString().indexOf(filter) != -1; };
    }else {
      this.indeterCheckbox1 = false;
    }
  }



  addHouseDelete(){
    if(!this.indeterCheckbox1){
      this.indeterCheckbox1 = true;
    }
    this.deletesHouses = [];
    for (let house of this.propiedades) {
      if (house.checked) {
        this.deletesHouses.push(house);
      }
    }
    console.log(this.deletesHouses);
  }

  applyFilter(myValue){
    myValue = myValue.trim();
    //myValue = myValue.toLowerCase();
    this.dataSource.filter = myValue;
  }

  clickShowDetailsHouse(house: Propiedad){
    const dialogRef = this.dialog.open(DialogOverviewHouseDetails, {
      width: '250px',
      data: house
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  clickShowCommonExpensesHouse(position: Boleta){
    const dialogRef = this.dialog.open(DialogHouseCommonExpenses, {
      width: '600px',
      data: position
    });
  }
  clickShowHomeOwner(propietario){
    if (propietario) {
      const dialogRef = this.dialog.open(DialogSeeHomeOwnerComponent, {
        data: propietario
      })
    } else {
      console.error('No hay propietario');
    }
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
        return false;
    }
    return true;
  };



}

