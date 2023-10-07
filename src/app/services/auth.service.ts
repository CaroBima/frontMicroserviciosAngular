import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginUsuario } from '../models/login-usuario';
import { Observable } from 'rxjs';
import { JwtModel } from '../models/jwt-model';
import { NuevoUsuario } from '../models/nuevo-usuario';
import { API_URL_LOGIN } from '../configuracion';

const cabecera = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

const urlConst = `${API_URL_LOGIN}`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  
  public login(usuario: LoginUsuario): Observable<JwtModel> {
    return this.httpClient.post<JwtModel>(urlConst + 'login', usuario, cabecera);
  }

  public registro(usuario: NuevoUsuario): Observable<any> {
    return this.httpClient.post<any>(urlConst + 'register', usuario, cabecera);
  }

}