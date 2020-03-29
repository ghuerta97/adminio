import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatPaginatorModule,
  MatTableModule,
  MatDialogModule,
  MatCardModule,
  MatCheckboxModule,
  MatSelectModule,
  MatChipsModule,
  MatIconModule,
} from '@angular/material';
import { ListHousesComponent } from '../../list-houses/list-houses.component';
import { SpeedDialFabComponent } from 'app/speed-dial-fab/speed-dial-fab.component';
import { FormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ConfigurationComponent } from 'app/configuration/configuration.component';

import { CalendarEventsComponent } from 'app/calendar-events/calendar-events.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { GastoComunComponent } from 'app/gasto-comun/gasto-comun.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatTableModule,
    MatDialogModule,
    MatCardModule,
    MatCheckboxModule,
    FormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatSelectModule,
    MatChipsModule,
    MatIconModule,
    FullCalendarModule,
    NgbModule
  ],
  declarations: [
    DashboardComponent,
    ListHousesComponent,
    SpeedDialFabComponent,
    ConfigurationComponent,
    CalendarEventsComponent,
    GastoComunComponent
  ]
})
export class AdminLayoutModule {}
