import { RolUsuario } from "./rol-usuario";

export class NuevoUsuario {
    //nombre: string;
    nombreUsuario: string;
    email: string;
    rolUsuario: RolUsuario;
    contrasenia: string;

    constructor(nombreUsuario: string, email: string, contrasenia: string, rolUsuario : RolUsuario) {
        //this.nombre = nombre;
        this.nombreUsuario = nombreUsuario;
        this.email = email;
        this.contrasenia = contrasenia;
        this.rolUsuario = rolUsuario;
    }
}