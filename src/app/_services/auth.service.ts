import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ICurrentUser, IUser } from "../_models/user.models";
import { BehaviorSubject } from "rxjs";

const BASE_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:';
const API_KEY = 'AIzaSyCJ5PEdWr7yx-vIx0XlVZwa4I8eagcpb1w';

@Injectable({
    providedIn: 'root'
})
export class AuthService{
    private currentUserSource = new BehaviorSubject<ICurrentUser | null>(null);
    currentUser$ = this.currentUserSource.asObservable();

    constructor(private http:HttpClient , private router:Router){}

    register(model:IUser){
        let registerModel={
            email:model.email,
            password:model.password,
            returnSecureToken:true,
        };

        this.http
          .post<ICurrentUser>(BASE_URL + `signUp?key=${API_KEY}`,registerModel)
          .subscribe((response: ICurrentUser) => {
            const user = {
                idToken: response.idToken,
                email: response.email,
                refreshToken: response.refreshToken,
                expiresIn: response.expiresIn,
            };
            this.currentUserSource.next(user);
            this.setLocalStorage(user);

            this.router.navigateByUrl('/');
          })
    
    }

    login(model:IUser){
        let loginModel={
            email:model.email,
            password:model.password,
            returnSecureToken:true,
        };

        this.http
          .post<ICurrentUser>(BASE_URL + `signInWithPassword?key=${API_KEY}`,loginModel)
          .subscribe((response: ICurrentUser) => {
            const user = {
                idToken: response.idToken,
                email: response.email,
                refreshToken: response.refreshToken,
                expiresIn: response.expiresIn,
            };
            this.currentUserSource.next(user);
            this.setLocalStorage(user);

            this.router.navigateByUrl('/');
          })
    
    }

    logout(){
        this.removeLocalStorage();
        this.currentUserSource.next(null);
    }

    removeLocalStorage(){
        localStorage.removeItem('user');
    }

    autoLogin(){
        const userString = localStorage.getItem('user');
        if (userString){
            const user: ICurrentUser = JSON.parse(userString);
            this.currentUserSource.next(user);
        }

    }

    setLocalStorage(user : ICurrentUser){
        localStorage.setItem('user',JSON.stringify(user));
    }

    
}