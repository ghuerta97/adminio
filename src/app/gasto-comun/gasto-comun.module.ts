import { NgModule } from "@angular/core";
import { DialogCreateGastoComun } from "./DialogCreateGastoComun/dialog-create-gasto-comun.component";
import { MatButtonModule, MatTableModule, MatFormFieldModule, MatDialogModule, MatInputModule, MatDatepickerModule, MatDialog, MatSpinner } from "@angular/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

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
            NgbModule
        ], declarations: [
            DialogCreateGastoComun
        ],
        entryComponents: [
            DialogCreateGastoComun
        ]
    }
)
export class GastoComunModule {

}