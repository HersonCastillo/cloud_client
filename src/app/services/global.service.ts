import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class Globals {
    constructor() { }
    private _path: string = "/aidersite/api/public/";
    public get path(): string{
        return this._path;
    }
}
