import { NgModule } from "@angular/core";
import { DialogCreateGastoComun, SubiendoNuevoComponent } from "./DialogCreateGastoComun/dialog-create-gasto-comun.component";
import { MatButtonModule, MatTableModule, MatFormFieldModule, MatDialogModule, MatInputModule, MatDatepickerModule, MatDialog, MatSpinner, MatProgressSpinnerModule } from "@angular/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { SubiendoComponent } from "./gasto-comun.component";

@NgModule(
    {
        imports: [
            FormsModule,
            ReactiveFormsModule,
            MatButtonModule,
            MatTableModule,
            MatFormFieldModule,
            MatDialogModule,
            MatInputModule,
            MatDatepickerModule,
            NgbModule,
            MatProgressSpinnerModule
        ], declarations: [
            DialogCreateGastoComun,
            SubiendoComponent,
            SubiendoNuevoComponent
        ],
        entryComponents: [
            DialogCreateGastoComun,
            SubiendoComponent,
            SubiendoNuevoComponent
        ]
    }
)
export class GastoComunModule {

}