import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './composants/home/home.component';
import { LayoutComponent } from './composants/layout/layout.component';
import { AdminDetailAtrComponent } from './composants/admin-detail-atr/admin-detail-atr.component';
import { DetailsComponent } from './composants/details/details.component';
import { ReservationComponent } from './composants/reservation/reservation.component';
import { CommentaireComponent } from './composants/commentaire/commentaire.component';
import { AddAttractionComponent } from './composants/add-attraction/add-attraction.component';
import { UpdateAttractionComponent } from './composants/update-attraction/update-attraction.component';
import { TouristComponent } from './composants/tourist/tourist.component';
import { AuthentificationComponent } from './composants/authentification/authentification.component';
import { AuthGuard } from './guards/auth.guard';

import { ForgetPasswordComponent } from './composants/forget-password/forget-password.component';
import { ResetPasswordComponent } from './composants/reset-password/reset-password.component';
import { CategoriesComponent } from './composants/categories/categories.component';
import { AddCategorieComponent } from './composants/add-categorie/add-categorie.component';
import { ServiceComponent } from './composants/service/service.component';
import { UpdateCategorieComponent } from './composants/update-categorie/update-categorie.component';

const routes: Routes = [
  {path:"",component:AuthentificationComponent},
  {path:"forget-password",component:ForgetPasswordComponent},
  {path:"reset-password/:token",component:ResetPasswordComponent},

  // { path: '', redirectTo: '/authentification', pathMatch: 'full' },
  {path:"home",canActivate:[AuthGuard],component:HomeComponent,children:[


    {path:"",component:LayoutComponent},

    {path:"admin-detail-atr",component:AdminDetailAtrComponent},
    {path:"detail/:id",component:DetailsComponent},
    {path:"reservation",component:ReservationComponent},
    {path:"commentaire",component:CommentaireComponent},
    {path:"add_attraction",component:AddAttractionComponent},
    {path:"update-attraction/:id",component:UpdateAttractionComponent},
    {path:"tourist",component:TouristComponent},
    {path:"categories",component:CategoriesComponent},
    {path:"add-categorie",component:AddCategorieComponent},
    {path:"service/:id",component:ServiceComponent},
    {path:"update-categorie/:id",component:UpdateCategorieComponent},
   
   
   





  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
