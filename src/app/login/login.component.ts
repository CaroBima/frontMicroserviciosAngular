import { Component, OnInit } from '@angular/core';
import { LoginUsuario } from '../models/login-usuario';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  nomUsu? : string; 

  form: any = {};
  usuario: LoginUsuario | undefined; 
  isLogged = false;
  isLoginFail = false;
  roles: string[] = [];
  errorMsg = '';

  constructor(private authService: AuthService, private tokenService: TokenService, private router: Router) { }

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
      this.nomUsu = this.tokenService.getUserName();
      this.router.navigate(['/home']); //si el usuario está logueado redirecciona al home
     
    }
  }

  onLogin(): void {
    this.usuario = new LoginUsuario(this.form.nombreUsuario, this.form.password);
    this.nomUsu = this.usuario.nombreUsuario;
    this.authService.login(this.usuario).subscribe(response => {
      if (response && response.data["token"]) {
        // Guardar el token en el servicio de tokens
        this.tokenService.setToken(response.data["token"]);
        
        // Guardar el nombre de usuario en el servicio de tokens
        this.tokenService.setUserName(response.data["nombreUsuario"]);
        
        // Guardar las autoridades en el servicio de tokens
        this.tokenService.setAuthorities(response.authorities);
    
        this.isLogged = true;
        this.isLoginFail = false;
        this.roles = ["USER"] //this.tokenService.getAuthorities();
        window.location.reload();
        
      } else {
        // Manejar el caso en el que el token no está presente en la respuesta.
        this.isLogged = false;
        this.isLoginFail = true;
        this.errorMsg = 'Token no encontrado en la respuesta.';
      }
    },
    (err: any) => {
      this.isLogged = false;
      this.isLoginFail = true;
      this.errorMsg = err.error.message;
    });
  }
   
  onLogout() : void{
    console.log(this.nomUsu);
    console.log("entra al logout");
    this.tokenService.logOut();
    this.isLogged = false;
    this.isLoginFail = true;
    console.log(this.nomUsu);
  }
  
  
}