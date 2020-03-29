import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ConfigurationComponent } from "./configuration.component";
import {MatFormFieldModule, MatSelectModule} from '@angular/material'; 

@NgModule({
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatSelectModule

    ],
    declarations:[
    ],
    exports: [
    ]
})

export class ConfigurationModule {

}