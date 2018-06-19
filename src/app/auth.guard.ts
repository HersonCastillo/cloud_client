import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { Http } from '@angular/http';
import { Globals } from './services/global.service';
import { Router } from '@angular/router';
@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private globals: Globals,
        private router: Router,
        private http: Http
    ){}
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        try{
            return new Promise<boolean>((rs, rj) => {
                let token = localStorage.getItem('token');
                if(token == null){
                    rs(false);
                    this.router.navigate(['login']);
                } else {
                    token = token.split(".")[0];
                    this.http.post(this.globals.path + '/api/validate/token', { token: token })
                    .subscribe(r => {
                        let dr: any = r.json();
                        if(dr.success && dr.user) rs(true);
                        else{
                            rs(false);
                            this.router.navigate(['login']);
                        }
                    }, () => {
                        rs(false)
                        this.router.navigate(['login']);
                    });
                }
            });
        }catch(ex){
            return new Promise<boolean>((rs, rj) => {
                rs(false);
                this.router.navigate(['login']);
            });
        }
    }
}
@Injectable({
    providedIn: 'root'
})
export class LoginGuard implements CanActivate{
    constructor(
        private globals: Globals,
        private router: Router,
        private http: Http
    ){}
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        try{
            return new Promise<boolean>((rs, rj) => {
                let token = localStorage.getItem('token');
                if(token == null) rs(true);
                else {
                    token = token.split(".")[0];
                    this.http.post(this.globals.path + '/api/validate/token', { token: token })
                    .subscribe(r => {
                        let dr: any = r.json();
                        if(dr.success && dr.user){
                            rs(false);
                            this.router.navigate(['home']);
                        } else rs(true);
                    }, () => {
                        rs(true);
                    });
                }
            });
        }catch(ex){
            return new Promise<boolean>((rs, rj) => {
                rs(true);
            });
        }
    }
} 