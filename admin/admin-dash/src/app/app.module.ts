import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './composants/home/home.component';
import { LayoutComponent } from './composants/layout/layout.component';
import { HeaderComponent } from './composants/header/header.component';
import { FooterComponent } from './composants/footer/footer.component';
import { SidebarComponent } from './composants/sidebar/sidebar.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminDetailAtrComponent } from './composants/admin-detail-atr/admin-detail-atr.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DetailsComponent } from './composants/details/details.component';
import { RouterModule } from '@angular/router';
import { ReservationComponent } from './composants/reservation/reservation.component';
import { CommentaireComponent } from './composants/commentaire/commentaire.component';
import { AddAttractionComponent } from './composants/add-attraction/add-attraction.component';
import { UpdateAttractionComponent } from './composants/update-attraction/update-attraction.component';
import { TouristComponent } from './composants/tourist/tourist.component';
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthentificationComponent } from './composants/authentification/authentification.component';
//import { jwtDecode } from 'jwt-decode';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ForgetPasswordComponent } from './composants/forget-password/forget-password.component';
import { ResetPasswordComponent } from './composants/reset-password/reset-password.component';
import { CategoriesComponent } from './composants/categories/categories.component';
import { AddCategorieComponent } from './composants/add-categorie/add-categorie.component';
import { ServiceComponent } from './composants/service/service.component';
import { UpdateCategorieComponent } from './composants/update-categorie/update-categorie.component';
import { AddServiceComponent } from './composants/add-service/add-service.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    AdminDetailAtrComponent,
    DetailsComponent,
    ReservationComponent,
    CommentaireComponent,
    AddAttractionComponent,
    UpdateAttractionComponent,
    TouristComponent,
    AuthentificationComponent,
    CategoriesComponent,
    
    ForgetPasswordComponent,
    ResetPasswordComponent,
    AddCategorieComponent,
    ServiceComponent,
    UpdateCategorieComponent,
    AddServiceComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
     NgxPaginationModule,
     Ng2SearchPipeModule,
      RouterModule,
    ReactiveFormsModule,
      NgbModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
