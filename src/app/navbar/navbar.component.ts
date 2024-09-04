import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ICurrentUser } from '../_models/user.models';
import { Subscription } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy {
    
  user: ICurrentUser| null = null;;
  userSub: Subscription= new Subscription();

  constructor(private authService:AuthService,
    private router:Router,
  ){}

  ngOnInit(){
    this.userSub = this.authService.currentUser$.subscribe(
      (currentUser: ICurrentUser|null) => {
        this.user = currentUser;
      },);
  }

  onLogout(){
    this.authService.logout();
    this.router.navigateByUrl('/')
  }

  ngOnDestroy(){
    this.userSub.unsubscribe();
  }
}
