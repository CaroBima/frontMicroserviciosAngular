import { Injectable } from '@angular/core';
import { API_URL } from '../configuracion';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from './token.service';
import { Cultura } from '../models/cultura-model';
import { Observable } from 'rxjs';

const urlConst = `${API_URL}`;

@Injectable({
  providedIn: 'root'
})
export class ProgramasCulturaService {
   
  private url;
  private token : string;
  

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


  public getProgramasCultura(): Observable<Cultura[]> {
    let endpoint = this.url + '/programas';
    return this.http.get<Cultura[]>(endpoint, this.httpOptions);
  }

}
