import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Globals } from './global.service';
@Injectable({
    providedIn: 'root'
})
export class LoginService {
    constructor(
        private http: Http,
        private globals: Globals
    ){}
    public login(data): Promise<any>{
        return new Promise<void>((rs, rj) => {
            this.http.post(this.globals.path + "/api/login", data)
            .subscribe(r => rs(r.json()), err => rj(err));
        });
    }
    public validateToken(): Promise<any>{
        return new Promise<void>((rs, rj) => {
            let token = localStorage.getItem('token');
            if(token == null) rj(null);
            else {
                token = token.split(".")[0];
                this.http.post(this.globals.path + '/api/validate/token', { token: token })
                .subscribe(r => rs(r.json()), err => rj(err));
            }
        });
    }
    public createAccount(data): Promise<any>{
        return new Promise<void>((rs, rj) => {
            this.http.post(this.globals.path + '/api/new/account', data)
            .subscribe(r => rs(r.json()), err => rj(err));
        });
    }
}
