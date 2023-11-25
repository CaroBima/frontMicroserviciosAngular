import { Component, OnInit } from '@angular/core';
import { Clima } from '../models/clima-model';
import { ClimaService } from '../services/clima.service';

@Component({
  selector: 'app-clima',
  templateUrl: './clima.component.html',
  styleUrls: ['./clima.component.css']
})
export class ClimaComponent implements OnInit {
  fechaFormateada : String = '';
  clima? : Clima;
  inputCiudad : String = ''; 
  inputPais : String = '';

  constructor( private climaService: ClimaService) { }

  ngOnInit(): void {

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
  

}
