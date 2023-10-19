import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { TokenService } from '../services/token.service';
import { ClimaService } from '../services/clima.service';
import { Clima } from '../models/clima-model';
import { ProgramasCulturaService } from '../services/programas-cultura.service';
import { Cultura } from '../models/cultura-model';
import { MoviesService } from '../services/movies.service';
import { Movie } from '../models/movie-model';
import { URL_IMAGEN } from '../configuracion';


const urlImgConst = `${URL_IMAGEN}`;
const size = 'w300';
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
  moviesList : Movie[] = [];
  inputTitulo : String = '';
  

  constructor(private tokenService: TokenService, private climaService: ClimaService, private culturaService : ProgramasCulturaService, private moviesService : MoviesService) { }

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

  getMovies(titulo : String){
    this.moviesList = []; //limpio la lista para traer los resultados
    this.moviesService.getMovies(titulo).subscribe((evento)=>{
      evento.forEach((x) => {
        x.poster_path = urlImgConst + size + x.poster_path;
        this.moviesList.push(x);
      });
      return evento;
    });
    console.log(this.moviesList);
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
