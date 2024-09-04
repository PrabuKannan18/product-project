import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from '../_models/user.models';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-user-auth',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css'
})
export class UserAuthComponent {
  isRegisterMode : boolean =false;
 
  router=inject(Router)
  registerToggle(){
    this.isRegisterMode = !this.isRegisterMode;
  }

  constructor(private authservice:AuthService){}

  model:IUser={
    email : '',
    password :''
  }

  onSubmit(userForm: NgForm) {
    if (userForm.valid) {
      console.log(userForm.value);
      this.router.navigateByUrl('/')
    } else {
      userForm.form.markAllAsTouched(); // This will mark all fields as touched, showing validation errors
    }

    if(this.isRegisterMode){
      this.authservice.register(this.model);
    }else{
      this.authservice.login(this.model);
    }

  }

}
