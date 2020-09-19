import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

//necessary for routing in your app
import { RouterModule, Routes } from '@angular/router';
//necessary for get requests
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';

import { AppComponent } from './app.component';
import { StreamComponent } from './stream/stream.component';
import { ApiService } from './api.service';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { DoctrineComponent } from './doctrine/doctrine.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContactComponent } from './contact/contact.component';
import { FilterStreamPipe } from './filter-stream.pipe';
import { ReferenceComponent } from './reference/reference.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { UploadComponent } from './upload/upload.component';
import { TokenInterceptorService } from "./token-interceptor.service";
import { ManageStreamComponent } from './manage-stream/manage-stream.component';

const appRoutes: Routes = [
  { path: 'stream', component: StreamComponent },
  { path: 'about', component: AboutComponent },
  { path: 'doctrine', component: DoctrineComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'reference', component: ReferenceComponent },
  { path: 'login', component: LoginComponent },
  { path: 'upload', component: UploadComponent, canActivate: [AuthGuard] },
  { path: 'manage', component: ManageStreamComponent, canActivate: [AuthGuard] },
  { path: '', component: HomeComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    StreamComponent,
    HomeComponent,
    AboutComponent,
    DoctrineComponent,
    ContactComponent,
    FilterStreamPipe,
    ReferenceComponent,
    LoginComponent,
    UploadComponent,
    ManageStreamComponent
  ],
  imports: [
    BrowserModule,
    //include HTTP Client Module after Browser
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true, useHash: true }//useHash fixes the Can't Get Error on refresh
      // <-- debugging purposes only
    ),
    BrowserAnimationsModule,
    FormsModule,
    MatMenuModule
  ],
  //services are distributed via the providers section in the @ngModule
  providers: [ApiService, AuthGuard, AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
