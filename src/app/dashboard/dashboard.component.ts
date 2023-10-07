import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { TokenService } from '../services/token.service';
import { ClimaService } from '../services/clima.service';
import { Clima } from '../models/clima-model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  info: any = {};
  clima? : Clima;
  inputCiudad : String = ''; 
  inputPais : String = '';
 

  constructor(private tokenService: TokenService, private climaService: ClimaService) { }

  ngOnInit() {
    this.info = {
      token: this.tokenService.getToken(),
      nombreUsuario: this.tokenService.getUserName(),
      authorities: this.tokenService.getAuthorities()
    };
    
    //Carga el clima por defecto (En córdoba);
    this.climaService.getClima().subscribe((respuesta) => {
        this.clima = respuesta;
      });
  
  }

  //Permite obtener el clima para una determinada ciudad
  getClima(ciudad : String, pais : String){
    const ciudadYPais = ciudad + ', ' + pais;
    this.climaService.getClima(ciudadYPais).subscribe((respuesta) => {
      this.clima = respuesta;
    });

  
    
    
  }
  
}
