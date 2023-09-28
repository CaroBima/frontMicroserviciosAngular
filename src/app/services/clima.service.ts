import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../configuracion';

const urlConst = `${API_URL}`;

@Injectable({
  providedIn: 'root'
})

export class ClimaService {
  
  private url;

  constructor(private http: HttpClient) {
    this.url = urlConst;
  }

}
