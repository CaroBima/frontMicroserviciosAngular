import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL } from '../configuracion';
import { Observable } from 'rxjs';
import { Clima } from '../models/clima-model';
import { TokenService } from './token.service';

const urlConst = `${API_URL}`;

@Injectable({
  providedIn: 'root'
})

export class ClimaService {
  
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




  //devuelve todos los cursos almacenados en la bbdd
  public getClima(ciudad? : String): Observable<Clima> {
    console.log(ciudad)
    ciudad = ciudad || "Cordoba, Argentina";
    console.log(ciudad)

    let endpoint = this.url + '/clima?ciudad='+ ciudad;
    return this.http.get<Clima>(endpoint, this.httpOptions);
  }

}
