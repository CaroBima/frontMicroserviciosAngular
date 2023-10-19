import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { API_MOVIE_URL } from '../configuracion';
import { Movie } from '../models/movie-model';
import { Observable } from 'rxjs';

const urlConst = `${API_MOVIE_URL}`;

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private url;
  private token : string;
  //private ciudad : String = 'Córdoba, Argentina';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, HEAD, OPTIONS',
    }),
  };

  constructor(private http: HttpClient, tokenService : TokenService) {
    this.url = urlConst;
    this.token = tokenService.getToken();
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer ' + this.token);
  }

  //devuelve un listado con las peliculas encontradas en tmdb para un titulo determinado
    public getMovies(titulo : String): Observable<Movie[]> {
      let endpoint = this.url + 'search/'+ titulo;
      return this.http.get<Movie[]>(endpoint, this.httpOptions);
  }
}
