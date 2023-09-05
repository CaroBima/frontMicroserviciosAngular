import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GuardGuard } from './guards/guard.guard';

const routes: Routes = [  
//{ path: "", component: AppComponent, pathMatch: "full" },
{ path: "login", component: LoginComponent, pathMatch: "full" },
{ path: "registro", component: RegisterComponent, pathMatch: "full", canActivate: [GuardGuard]},
{ path: "**", component: DashboardComponent, pathMatch: "full", canActivate: [GuardGuard]},
{path: '', component: DashboardComponent, canActivate: [GuardGuard]},
{path: 'home', component: DashboardComponent, canActivate: [GuardGuard]},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
