import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { TokenService } from '../services/token.service';
import { ClimaService } from '../services/clima.service';
import { Clima } from '../models/clima-model';
import { ProgramasCulturaService } from '../services/programas-cultura.service';
import { Cultura } from '../models/cultura-model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  info: any = {};
  clima? : Clima;
  programasCultura : Cultura[] = [];
  inputCiudad : String = ''; 
  inputPais : String = '';
  programaSeleccionado: number = 0;
 

  constructor(private tokenService: TokenService, private climaService: ClimaService, private culturaService : ProgramasCulturaService) { }

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
  
      this.getCultura();
  }

  //Permite obtener el clima para una determinada ciudad
  getClima(ciudad : String, pais : String){
    const ciudadYPais = ciudad + ', ' + pais;
    this.climaService.getClima(ciudadYPais).subscribe((respuesta) => {
      this.clima = respuesta;
    });
  }

  getCultura(){
      this.culturaService.getProgramasCultura().subscribe((evento)=>{
        evento.forEach((x) => {
          this.programasCultura.push(x);
        });
        return evento;
      });
      console.log(this.programasCultura);
  }

  public obtenerValorPorPosicion(obj: any, posicion: number): any {
    return Object.keys(obj)[posicion];
  }
  
}
