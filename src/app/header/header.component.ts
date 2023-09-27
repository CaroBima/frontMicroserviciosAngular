import { Component, OnInit } from '@angular/core';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  info: any = {};

  nomUsu? : string; 

  form: any = {};
  isLogged = false;
  isLoginFail = false;
  roles: string[] = [];
  errorMsg = '';


  constructor(private tokenService: TokenService) { }


   ngOnInit() {
    this.info = {
      token: this.tokenService.getToken(),
      nombreUsuario: this.tokenService.getUserName(),
      authorities: this.tokenService.getAuthorities()
    };
  }

  onLogout() : void{
    this.tokenService.logOut();
    this.isLogged = false;
    this.isLoginFail = true;
  }
}
