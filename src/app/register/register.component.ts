import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import {AuthService} from '../services/auth.service';
import { Router } from '@angular/router';
import { NuevoUsuario } from '../models/nuevo-usuario';
import { RolUsuario } from '../models/rol-usuario';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  nombreUsuario!: string;
  contrasenia!: string;
  confirmContrasenia!: string;
  contraseniaError!: boolean;
  email!: string;


  user : NuevoUsuario = {
    nombreUsuario: this.nombreUsuario, 
    email: this.email,
    contrasenia: this.contrasenia,
    rolUsuario:  new RolUsuario('USER')
  };
  constructor(public userService: UsersService, public router: Router, public authService : AuthService) {}

  ngOnInit(): void {
  }

  register() {
    this.user = { 
      nombreUsuario: this.nombreUsuario, 
      email: this.email, 
      rolUsuario:  new RolUsuario('USER'), 
      contrasenia: this.contrasenia 
    };

    this.authService.registro(this.user).subscribe(data => {
        this.userService.setToken(data.token);
        this.router.navigateByUrl("/");
      console.log('registro ', this.user);
    });
  }
  
}

