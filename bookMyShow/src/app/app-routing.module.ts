import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "signUp",
    pathMatch: 'full'
  },
  {
    path: 'signUp',
    component:SignUpComponent
  },
  { path: 'dashboard',
   component: DashboardComponent 
  },
   {
     path: 'loginPage',
     component:LoginPageComponent
   },
   {
    path: '**',
    redirectTo: 'signUp'
  }
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
