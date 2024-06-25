import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-who',
  templateUrl: './register-who.component.html',
  styleUrl: './register-who.component.css'
})
export class RegisterWhoComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router){}

  datoSesion: any;

  ngOnInit(): void {
    this.datoSesion = this.authService.getUserData();
    if(this.datoSesion){
      this.router.navigate(['/']);
      return;
    }
  }
}
