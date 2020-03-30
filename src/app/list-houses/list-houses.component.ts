import { Component, OnInit, ViewChild, Inject, Input, OnChanges } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatDialog } from '@angular/material/dialog';
import { DialogOverviewHouseDetails } from './DialogOverviewHouseDetails/dialog-overview-house-details.component';
import { DialogHouseCommonExpenses } from './DialogHouseCommonExpenses/dialog-house-common-expenses.component';
import { DialogAddHouseComponent } from './DialogAddHouse/dialog-add-house.component';
import { DialogSeeHomeOwnerComponent, DialogConfirmar } from './DialogSeeHomeowner/dialog-seehomeowner.component';
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
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
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
      .map((country, i) => ({ id: i + 1, ...country }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  set houses(houses) {
    this.propiedades = houses;
  }
  constructor(public dialog: MatDialog,
    private propiedadService: PropiedadService) {

  }

  get data(): MatTableDataSource<Propiedad> {
    return new MatTableDataSource<Propiedad>(this.propiedades);
  }

  set data(dataSource) {
    this.data = dataSource;
  }

  ngOnInit() {
    this.propiedadService.listPropiedades()
      .subscribe(data => {
        this.houses = data;
        console.log(data);
        this.dataSource = new MatTableDataSource<Propiedad>(this.houses);
        this.dataSource.paginator = this.paginator;
        this.collectionSize = this.propiedades.length;
      })
    this.fabButtons = [
      {
        name: 'Add House',
        icon: 'add',
        action: function (dialog: MatDialog): any {
          const dialogRef = dialog.open(DialogAddHouseComponent, {
            width: '600px',
            height: '445px',
            data: { title: 'Añadir Propiedad', subtitle: 'Formulario de ingreso', titleButton: 'Añadir', add: true, house:null }
          });
          dialogRef.afterClosed().subscribe(result => {
            console.log('Ha cerrado Dialog Add House')
          });
        }
      }
    ];


    this.dataSource.filterPredicate = (data: Propiedad, filter: string) => { return data.numeroPropiedad.toString().indexOf(filter) != -1; };
  }


  applyFilter(myValue) {
    myValue = myValue.trim();
    //myValue = myValue.toLowerCase();
    this.dataSource.filter = myValue;
  }

  clickShowDetailsHouse(house: Propiedad) {
    const dialogRef = this.dialog.open(DialogOverviewHouseDetails, {
      width: '250px',
      data: house
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  clickShowCommonExpensesHouse(position: Boleta) {
    const dialogRef = this.dialog.open(DialogHouseCommonExpenses, {
      width: '600px',
      data: position
    });
    dialogRef.beforeClosed()
      .subscribe(data => {
        if (data.pagada) {
          this.ngOnInit()
        }
      })
  }
  clickShowHomeOwner(propietario) {
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

  deleteHouse(propiedad) {
    const dialogRef = this.dialog.open(DialogConfirmar);
    dialogRef.beforeClosed()
    .subscribe(data => {
      if(data.ok){
        this.propiedadService.deletePropiedad(propiedad)
        .subscribe(data=>{})
      }
    })
    
  }



}
