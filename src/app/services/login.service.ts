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
    private maxVersionSupported = "1.0.0";
    public login(data): Promise<any>{
        return new Promise<void>((rs, rj) => {
            this.http.post(this.globals.path + "/api/login", data)
            .subscribe(r => rs(r.json()), err => rj(err));
        });
    }
}
