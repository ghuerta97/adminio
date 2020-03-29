import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { PropiedadService } from 'app/services/propiedad.service';
import { Propiedad } from 'app/model/propiedad';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  morosos: Propiedad[] = [];
  page = 1;
  pageSize = 4;
  collectionSize = 0;

  constructor(private propiedadService: PropiedadService) { }

  ngOnInit() {
  this.propiedadService.obtenerMorosos()
  .subscribe(data=> {
    this.morosos = data;
    this.collectionSize = this.list_morosos.length;
  })
  }

  get list_morosos() {
    return this.morosos.map((country, i) => ({id: i + 1, ...country}))
    .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

}
