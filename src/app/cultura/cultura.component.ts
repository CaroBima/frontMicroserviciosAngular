import { Component, OnInit } from '@angular/core';
import { ProgramasCulturaService } from '../services/programas-cultura.service';
import { Cultura } from '../models/cultura-model';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-cultura',
  templateUrl: './cultura.component.html',
  styleUrls: ['./cultura.component.css']
})
export class CulturaComponent implements OnInit {

  info: any = {};
  programaSeleccionado: number = 0;
  programasCultura : Cultura[] = [];

  constructor(private tokenService: TokenService, private culturaService : ProgramasCulturaService,) { }
  

  ngOnInit(): void {
    this.info = {
      token: this.tokenService.getToken(),
      nombreUsuario: this.tokenService.getUserName(),
      authorities: this.tokenService.getAuthorities(),
    };
    
    this.getCultura();
  }


  getCultura(){
    console.log("llega al getCultura")
    this.culturaService.getProgramasCultura().subscribe((evento)=>{
      evento.forEach((x) => {
        this.programasCultura.push(x);
      });
      return evento;
    });
}

}
