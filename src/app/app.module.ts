import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { SearchPipe } from './pipes/search.pipe';
import { ListHousesModule } from './list-houses/list-houses.module';
import {MatTooltipModule} from '@angular/material/tooltip'; 
import { MatDialogModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule} from '@angular/material';
import { ConfigurationModule } from './configuration/configuration.module';
import { LoginComponent } from './login/login.component';
import { GastoComunModule } from './gasto-comun/gasto-comun.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './services/auth-interceptor.service';
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
    HttpClientModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    SearchPipe,
    LoginComponent
  ],
  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
