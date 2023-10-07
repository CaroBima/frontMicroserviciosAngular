export class Cultura{
    link : String;
    nombre : String; 
    descripcion : String;
    depende_de: String

    constructor(link : String, nombre : String, descripcion : String, depende_de : String){
        this.link = link;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.depende_de = depende_de
  
    }
}
