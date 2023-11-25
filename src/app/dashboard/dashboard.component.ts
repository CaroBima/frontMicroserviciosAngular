import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { TokenService } from '../services/token.service';
import { ClimaService } from '../services/clima.service';
import { Clima } from '../models/clima-model';
import { MoviesService } from '../services/movies.service';
import { Movie } from '../models/movie-model';
import { URL_IMAGEN } from '../configuracion';



const urlImgConst = `${URL_IMAGEN}`;
const size = 'w300';
declare const $:any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  info: any = {};
  moviesList : Movie[] = [];
  upcomingMovies : Movie[] = [];
  inputTitulo : String = '';
  textoBusqueda : String = 'Esperando resultados de la búsqueda...'
  fechaFormateada : String = '';
  clima? : Clima;
  inputCiudad : String = ''; 
  inputPais : String = '';
  loading: boolean = true;

  constructor(private tokenService: TokenService, private climaService: ClimaService, private moviesService : MoviesService) { 
    //this.servicioConsultado = false;
  }

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

    this.getUpcomingMovies();
  }

/*  ngAfterViewInit(){
    $('#carouselExampleAutoplaying').carousel()
  }*/


 
 
  public getUpcomingMovies(){
      //this.upcomingMovies = [];
      this.loading = true;
      this.moviesService.getUpcomingMovies().subscribe((evento)=>{
        evento.forEach((upcomingMovie)=>{
          if(upcomingMovie.poster_path){
            upcomingMovie.poster_path = urlImgConst + size + upcomingMovie.poster_path;
          }
          upcomingMovie.release_date = this.formatearFecha(upcomingMovie.release_date);
          this.upcomingMovies.push(upcomingMovie);
          this.loading = false;
        });

      })
  }
 



  public obtenerValorPorPosicion(obj: any, posicion: number): any {
    return Object.keys(obj)[posicion];
  }

  /**
   * Método que permite formatear la fecha para que se muestre como dd-MM-yyyy
   * @param fecha 
   * @returns fechaFormateada : string
   */
  formatearFecha(fecha : Date | string) : string{
    let fechaDate: Date = new Date();
    let fechaFormateada : string = '';

    if (fecha) { //si no es date lo paso a date
      if (fecha instanceof Date) {
        fechaDate = fecha
      } else {
        fechaDate = new Date(fecha);
      }
    }
    if(fechaDate != null && fechaDate instanceof Date){

      const dia: number = fechaDate.getDate();
      const mes: number = fechaDate.getMonth() + 1;
      const anio: number = fechaDate.getFullYear();

      const diaString: string = dia < 10 ? `0${dia}` : dia.toString();
      const mesString: string = mes < 10 ? `0${mes}` : mes.toString();

      fechaFormateada = `${diaString}-${mesString}-${anio}`;
      
    }
    return fechaFormateada;
    
  }
}
