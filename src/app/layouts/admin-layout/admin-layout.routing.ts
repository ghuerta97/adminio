import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { ListHousesComponent } from 'app/list-houses/list-houses.component';
import { ConfigurationComponent } from 'app/configuration/configuration.component';

import { CalendarEventsComponent } from 'app/calendar-events/calendar-events.component';
import { GastoComunComponent } from 'app/gasto-comun/gasto-comun.component';
import { AdminLayoutComponent } from './admin-layout.component';
export const AdminLayoutRoutes: Routes = [
    {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    { path: 'dashboard', component: DashboardComponent },
    {path:'list-houses', component: ListHousesComponent},
    {path: 'settings', component: ConfigurationComponent},
    {path: 'calendar-events', component: CalendarEventsComponent},
    {path: 'gasto-comun' , component: GastoComunComponent}
];
