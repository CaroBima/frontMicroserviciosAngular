import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { API_URL } from '../configuracion';

const urlConst = `${API_URL}`;

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
}
