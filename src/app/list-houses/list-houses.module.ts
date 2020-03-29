import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DialogOverviewHouseDetails } from './DialogOverviewHouseDetails/dialog-overview-house-details.component';
import { DialogHouseCommonExpenses } from './DialogHouseCommonExpenses/dialog-house-common-expenses.component';
import { MatButtonModule,
         MatSelectModule,
         MatCardModule,
         MatInputModule,
         MatDialogModule,
         MatIconModule,
         MatChipsModule,
        MatTooltipModule } from '@angular/material';
import { DialogAddHouseComponent } from './DialogAddHouse/dialog-add-house.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { DialogAddHomeOwnerComponent } from './DialogAddHomeOwner/dialog-add-homeowner.component';
import { DialogSeeHomeOwnerComponent, DialogConfirmar } from './DialogSeeHomeowner/dialog-seehomeowner.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
      CommonModule,
      RouterModule,
      MatButtonModule,
      MatCardModule,
      MatInputModule,
      MatDialogModule,
      MatIconModule,
      FormsModule,
      MatCheckboxModule,
      MatSelectModule,
      ReactiveFormsModule,
      MatChipsModule,
      MatTooltipModule,
      NgbModule
    ],
    declarations: [
        DialogOverviewHouseDetails,
        DialogHouseCommonExpenses,
        DialogAddHouseComponent,
        DialogAddHomeOwnerComponent,
        DialogSeeHomeOwnerComponent,
        DialogConfirmar
    ],
    exports: [
        DialogOverviewHouseDetails,
        DialogHouseCommonExpenses,
        DialogAddHouseComponent,
        DialogAddHomeOwnerComponent,
        DialogSeeHomeOwnerComponent
    ],
    entryComponents: [
        DialogOverviewHouseDetails,
        DialogHouseCommonExpenses,
        DialogAddHouseComponent,
        DialogAddHomeOwnerComponent,
        DialogSeeHomeOwnerComponent,
        DialogConfirmar
    ]
  })

  export class ListHousesModule {

  }