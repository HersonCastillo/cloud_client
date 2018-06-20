import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
@Injectable({
    providedIn: 'root'
})
export class Globals {
    constructor(private http: Http) { }
    //private _path: string = "https://aidersite.com/cloud_api/public";
    private _path: string = "/cloud_api/public";
    public get path(): string{
        return this._path;
    }
    public application(): Promise<any>{
        return new Promise<void>((rs, rj) => {
            this.http.get(this._path + '/application')
            .subscribe(s => rs(s.json()), err => rj(err));
        });
    }
}
