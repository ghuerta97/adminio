import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import * as jwt_decode from 'jwt-decode';
import { Router } from "@angular/router";
const TOKEN_NAME: string = 'token_user';
@Injectable({
    providedIn: 'root'
})
export class  AuthService {

    private currentUserSubject = new BehaviorSubject<any>(null); 


    constructor(private http: HttpClient, private router: Router) {

    }

    private _autenticated = false;

    public get authenticated(): boolean { return this._autenticated};

    login(username, password) {
        this.http.post<any>(environment.api+'/login',{'username': username, 'password': password}).
        subscribe(data=> {
          this.setToken(data.token);
            this.currentUserSubject.next(data.username);

                this._autenticated = true;
                this.router.navigateByUrl('/administrador');
            
        })
    }

    logout() {
      this.setToken('');
      this.router.navigateByUrl('/login');
    }

    getToken(): string {
        return localStorage.getItem(TOKEN_NAME);
      }
    
      setToken(token: string): void {
        localStorage.setItem(TOKEN_NAME, token);
      }

      private getTokenExpirationDate(token: string): Date {
        const decoded = jwt_decode(token);
    
        if (decoded.exp === undefined) return null;
    
        const date = new Date(0); 
        date.setUTCSeconds(decoded.exp);
        return date;
      }
    
      isTokenExpired(token?: string): boolean {
        if(!token) token = this.getToken();
        if(!token) return true;
    
        const date = this.getTokenExpirationDate(token);
        if(date === undefined) return false;
        return !(date.valueOf() > new Date().valueOf());
      }
  
      setpassword(username: string): Observable<boolean> {
        return this.http.post<boolean>(environment.api+'api/usuario/sendPassword',{username: username });
      }

      get currentUser(): Observable<any> {
        return this.currentUserSubject.asObservable();
      }
}