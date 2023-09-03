import { Data } from "@angular/router";

export class JwtModel {
   data : Data;
   message : string; 
   authorities: string[];
   
   constructor(data: Data, message: string, authorities : string[]){
        this.data = data;
        this.message = message;
        this.authorities = authorities;
   }
}
   

