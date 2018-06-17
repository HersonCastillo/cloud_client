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
    public show(path: string): Promise<any>{
        return new Promise<any>((rs, rj) => {
            if(localStorage.getItem('token')){
                let token = localStorage.getItem('token');
                token = token.split('.')[0];
                this.http.post(this.globals.path + "/api/view/files", {
                    token: token,
                    path: path
                }).subscribe(r => rs(r.json()), err => rj(err));
            } else rj(null);
        });
    }
    public downloadRoute(path: string, filename: string): Promise<any>{
        return new Promise<any>((rs, rj) => {
            if(localStorage.getItem('token')){
                let token = localStorage.getItem('token');
                token = token.split('.')[0];
                this.http.post(this.globals.path + "/api/download", {
                    token: token,
                    path: path,
                    filename: filename
                }).subscribe(r => rs(r.json()), err => rj(err));
            } else rj(null);
        });
    }
    public deleteOne(path: string, isFolder: string): Promise<any>{
        return new Promise<void>((rs, rj) => {
            if(localStorage.getItem('token')){
                let token = localStorage.getItem('token');
                token = token.split('.')[0];
                this.http.post(this.globals.path + "/api/delete/object", {
                    token: token,
                    path: path,
                    is: isFolder
                }).subscribe(r => rs(r.json()), err => rj(err));
            } else rj(null);
        });
    }
    public getShared(): Promise<any>{
        return new Promise<void>((rs, rj) => {
            if(localStorage.getItem('token')){
                let token = localStorage.getItem('token');
                token = token.split('.')[0];
                this.http.post(this.globals.path + "/api/shared", {
                    token: token
                }).subscribe(r => rs(r.json()), err => rj(err));
            } else rj(null);
        });
    }
    public newshare(filename: string): Promise<any>{
        return new Promise<void>((rs, rj) => {
            if(localStorage.getItem('token')){
                let token = localStorage.getItem('token');
                token = token.split('.')[0];
                this.http.post(this.globals.path + "/api/new/group", {
                    filename: filename,
                    token: token
                }).subscribe(r => rs(r.json()), err => rj(err));
            } else rj(null);
        });
    }
    public quitShare(filename: string): Promise<any>{
        return new Promise<void>((rs, rj) => {
            if(localStorage.getItem('token')){
                let token = localStorage.getItem('token');
                token = token.split('.')[0];
                this.http.post(this.globals.path + "/api/delete/share", {
                    filename: filename,
                    token: token
                }).subscribe(r => rs(r.json()), err => rj(err));
            } else rj(null);
        });
    }
}
