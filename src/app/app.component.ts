import { Component } from '@angular/core';
import {  RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthService } from './_services/auth.service';
import { FooterComponent } from './footer/footer.component';





@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,HomeComponent,NavbarComponent,FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private authService:AuthService){
    this.authService.autoLogin();
  }
}


      
