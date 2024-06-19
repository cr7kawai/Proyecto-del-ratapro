import { Component } from '@angular/core';
import { Usuario } from '../../models/usuario.inteface';
import { Empresa } from '../../models/empresa.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  captchaValidate: boolean = false;
  siteKey: string = '6LeF-_spAAAAAKKhS4KriR-VZLrY5atl2n0jt3g6';
  
  usuario: Usuario = {}
  empresa: Empresa = {}
  confirmPassword: string = '';

  mostrarFormulario(){
    this.captchaValidate = true;
  }

  register(){

  }
}
