import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {
  info: any = {};

  constructor(private router: Router, private tokenService: TokenService) {}

  canActivate(): boolean {
    this.info = { //valido si esta logueado buscando la info en el sessionstorage
      token: this.tokenService.getToken(),
      nombreUsuario: this.tokenService.getUserName(),
      authorities: this.tokenService.getAuthorities()
    };

    // Si el usuario está autenticado, retorna true; de lo contrario, redirige a la página de inicio de sesión y retorna false.
    if (this.info.token) {
      return true;
    } else {
      this.router.navigate(['/login']); // Redirige a la página de inicio de sesión si el usuario no está autenticado.
      return false;
    }
  }
  
  
  /*canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }*/
  
  
}
