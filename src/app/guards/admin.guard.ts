import { Injectable } from "@angular/core";
import { AuthService } from "app/services/auth.service";
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import * as jwt_decode from 'jwt-decode';
@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {
    constructor(private authService: AuthService, private router : Router){

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {
        const token = this.authService.getToken();
        const decoded = jwt_decode(token);
        if(decoded.AUTHORITY === 'ROLE_ADMIN') {
            return true;
        }
        this.router.navigate(['/login']);
        return false

    }




}