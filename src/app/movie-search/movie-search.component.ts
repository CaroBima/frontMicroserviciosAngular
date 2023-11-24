import { Component, OnInit } from '@angular/core';
import { TokenService } from '../services/token.service';
import { ClimaService } from '../services/clima.service';
import { MoviesService } from '../services/movies.service';
import { Movie } from '../models/movie-model';
import { URL_IMAGEN } from '../configuracion';
import { Clima } from '../models/clima-model';

const urlImgConst = `${URL_IMAGEN}`;
const size = 'w300';


@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css']
})
export class MovieSearchComponent implements OnInit {

  info: any = {};
  clima? : Clima;
  servicioConsultado : boolean;
  textoBusqueda : String = 'Esperando resultados de la búsqueda...'
  moviesList : Movie[] = [];
  inputTitulo : String = '';

  constructor(private tokenService: TokenService, private climaService: ClimaService, private moviesService : MoviesService) { 
    this.servicioConsultado = false;
  }

  ngOnInit(): void {
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

  getMovies(titulo : String){
    this.servicioConsultado = false;
    this.textoBusqueda = 'Esperando resultados de la búsqueda para ' + titulo;
    this.moviesList = []; //limpio la lista para traer los resultados
    this.moviesService.getMovies(titulo).subscribe((evento)=>{
      evento.forEach((x) => {
        if(x.poster_path){//si hay imagen, completo el path para que se muestre, si no pasa null
          x.poster_path = urlImgConst + size + x.poster_path;
        }
        x.release_date = this.formatearFecha(x.release_date);
        this.moviesList.push(x);
      });
      this.servicioConsultado = true;
      this.textoBusqueda = "La búsqueda de " + titulo + " no ha devuelto resultados";
      return evento;
    },
    err => {
        console.log(err);

    });
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
