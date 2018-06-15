import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from './global.service';
@Injectable({
    providedIn: 'root'
})
export class FolderService {
    constructor(
        private http: Http,
        private globals: Globals
    ) { }
    public createFolder(path: string): Promise<any>{
        return new Promise<void>((rs, rj) => {
            if(localStorage.getItem('token')){
                let token = localStorage.getItem('token');
                token = token.split('.')[0];
                this.http.post(this.globals.path + '/api/new/folder', {
                    raiz: token,
                    ruta: path
                }).subscribe(r => rs(r.json()), err => rj(err));
            } else rj(null);
        });
    }
}
