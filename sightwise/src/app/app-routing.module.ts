import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './composants/home/home.component';
import { LayoutComponent } from './composants/layout/layout.component';
import { AttractionAcceuilComponent } from './composants/attraction-acceuil/attraction-acceuil.component';
import { DetailAttractionComponent } from './composants/detail-attraction/detail-attraction.component';
import { LoginComponent } from './composants/login/login.component';
import { AcceuilPageComponent } from './composants/acceuil-page/acceuil-page.component';
import { RegisterComponent } from './composants/register/register.component';
import { ForgetPasswordComponent } from './composants/forget-password/forget-password.component';
import { ResetPasswordComponent } from './composants/reset-password/reset-password.component';
import { AuthGuard } from './guards/auth.guard';
import { GestionReservationComponent } from './composants/gestion-reservation/gestion-reservation.component';
import { DetailsServiceComponent } from './composants/details-service/details-service.component';
import { ProfileComponent } from './composants/profile/profile.component';
import { UpdateProfileComponent } from './composants/update-profile/update-profile.component';


const routes: Routes = [
  
  {path:"reset-password/:token",component:ResetPasswordComponent},
  {path:"forget-password",component:ForgetPasswordComponent},

  {path:"",component:HomeComponent,children:[
    {path:"",component:AcceuilPageComponent},
    {path:"register",component:RegisterComponent},
    {path:"login",component:LoginComponent},

    {path:"layout",component:LayoutComponent},
    {path:"attraction",component:AttractionAcceuilComponent},
    {path:"detail/:id",canActivate:[AuthGuard],component:DetailAttractionComponent},
    {path:"Gestion-reservation",component:GestionReservationComponent},
    {path:"details-service/:id",component:DetailsServiceComponent},
    {path:"profile/:id",component:ProfileComponent},
    {path:"update-profile/:id",component:UpdateProfileComponent},
   

  ]},

 //{path:"**",redirectTo:"/login"}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
