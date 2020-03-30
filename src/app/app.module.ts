import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ListHousesModule } from './list-houses/list-houses.module';
import {MatTooltipModule} from '@angular/material/tooltip'; 
import { MatDialogModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule} from '@angular/material';
import { ConfigurationModule } from './configuration/configuration.module';
import { LoginComponent } from './login/login.component';
import { GastoComunModule } from './gasto-comun/gasto-comun.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './services/auth-interceptor.service';
import localeFr from '@angular/common/locales/fr';
import localeFrExtra from '@angular/common/locales/extra/fr';
import { registerLocaleData } from '@angular/common';
import { AngularFireModule} from '@angular/fire';
import { AngularFireStorageModule} from '@angular/fire/storage';
import { environment } from 'environments/environment';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ComponentsModule,
    ListHousesModule,
    GastoComunModule,
    RouterModule,
    AppRoutingModule,
    MatTooltipModule,
    MatDialogModule,
    ConfigurationModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule

  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent
  ],
  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },
  
],
  bootstrap: [AppComponent]
})
export class AppModule implements OnInit { 
  ngOnInit(){
    registerLocaleData(localeFr, 'fr-FR', localeFrExtra);
  }
}
