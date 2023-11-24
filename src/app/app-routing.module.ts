import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GuardGuard } from './guards/guard.guard';
import { CulturaComponent } from './cultura/cultura.component';
import { MovieSearchComponent } from './movie-search/movie-search.component';

const routes: Routes = [  
//{ path: "", component: AppComponent, pathMatch: "full" },
{ path: "login", component: LoginComponent, pathMatch: "full" },
{ path: "registro", component: RegisterComponent, pathMatch: "full", canActivate: [GuardGuard]},
{ path: 'home', component: DashboardComponent, canActivate: [GuardGuard]},
{ path: 'cultura', component: CulturaComponent, canActivate: [GuardGuard]},
{ path: 'movsearch', component: MovieSearchComponent, canActivate: [GuardGuard]},
{ path: '', component: DashboardComponent, canActivate: [GuardGuard]},
{ path: "**", component: DashboardComponent, pathMatch: "full", canActivate: [GuardGuard]},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
