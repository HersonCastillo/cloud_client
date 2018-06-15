import { Injectable } from '@angular/core';
import { Globals } from './global.service';
import { Http } from '@angular/http';
@Injectable({
    providedIn: 'root'
})
export class FilesService {
    constructor(
        private globals: Globals,
        private http: Http
    ) { }
    public upload(file: File, path: string): Promise<any>{
        return new Promise<any>((rs, rj) => {
            if(localStorage.getItem('token')){
                let formData = new FormData();
                let token = localStorage.getItem('token');
                token = token.split('.')[0];
                formData.append('file', file);
                this.http.post(this.globals.path + '/api/new/file?token=' + token + "&path=" + path, formData)
                .subscribe(r => rs(r.json()), err => rj(err));
            } else rj(null);
        });
    }
}
