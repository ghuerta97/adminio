import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgxStripeModule } from 'ngx-stripe';
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
import { PaymentComponent } from './payment/payment.component';
import { DialogCreateGastoComun } from './gasto-comun/DialogCreateGastoComun/dialog-create-gasto-comun.component';
import { GastoComunModule } from './gasto-comun/gasto-comun.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './services/auth-interceptor.service';
import { CloudinaryModule } from '@cloudinary/angular-5.x';
  import * as  Cloudinary from 'cloudinary-core';
  import { Ng2CloudinaryModule } from 'ng2-cloudinary';
  import { FileUploadModule } from 'ng2-file-upload';
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
    NgxStripeModule.forRoot('pk_test_s9A1yhHPvrYKVsYQbhZo8RKv00UnssNpUx'),
    HttpClientModule,
    CloudinaryModule.forRoot(Cloudinary,{cloud_name: 'hxdxptasm',api_key: '252999181315384', api_secret: 'HEJIz86aLe7VWQZj2Gfukm_kPoY'})
    ,
    Ng2CloudinaryModule,
    FileUploadModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    SearchPipe,
    LoginComponent,
    PaymentComponent
  ],
  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
