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
  moviesList : Movie[] = [];
  inputTitulo : String = '';
  servicioConsultado : boolean;
  textoBusqueda : String = 'Esperando resultados de la búsqueda...'
  fechaFormateada : String = '';

  constructor(private tokenService: TokenService, private climaService: ClimaService, private moviesService : MoviesService) { 
    this.servicioConsultado = false;
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
  
      
  }

  //Permite obtener el clima para una determinada ciudad
  getClima(ciudad : String, pais : String){
    const ciudadYPais = ciudad + ', ' + pais;
    this.climaService.getClima(ciudadYPais).subscribe((respuesta) => {
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
          x.release_date = this.formatearFecha(x.release_date);
          //falta convertir la fecha para que se muestre dd/mm/yyyy solamente
        }
        this.moviesList.push(x);
      });
      this.servicioConsultado = true;
      this.textoBusqueda = "La búsqueda de " + titulo + " no ha devuelto resultados";
      return evento;
    });
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
