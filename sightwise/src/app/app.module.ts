import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './composants/home/home.component';
import { LayoutComponent } from './composants/layout/layout.component';
import { HeaderComponent } from './composants/header/header.component';
import { FooterComponent } from './composants/footer/footer.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AttractionAcceuilComponent } from './composants/attraction-acceuil/attraction-acceuil.component';
import { RouterModule } from '@angular/router';
import { DetailAttractionComponent } from './composants/detail-attraction/detail-attraction.component';
import { LightboxModule } from 'ngx-lightbox';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './composants/login/login.component';
import { AcceuilPageComponent } from './composants/acceuil-page/acceuil-page.component';
import { RegisterComponent } from './composants/register/register.component';
import { ForgetPasswordComponent } from './composants/forget-password/forget-password.component';
import { ResetPasswordComponent } from './composants/reset-password/reset-password.component';
import { Httpinterceptor } from './interceptor/auth.interceptor';
import { GestionReservationComponent } from './composants/gestion-reservation/gestion-reservation.component';
import { DetailsServiceComponent } from './composants/details-service/details-service.component';
import { ProfileComponent } from './composants/profile/profile.component';
import { UpdateProfileComponent } from './composants/update-profile/update-profile.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    AttractionAcceuilComponent,
    DetailAttractionComponent,
    LoginComponent,
    AcceuilPageComponent,
    RegisterComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    GestionReservationComponent,
    DetailsServiceComponent,
    ProfileComponent,
    UpdateProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    LightboxModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ReactiveFormsModule,NgbRatingModule, 
    
  
   
  
   
  
    
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS,
      useClass: Httpinterceptor,
      multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
