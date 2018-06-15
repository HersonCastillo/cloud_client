import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { NotificationsService } from 'angular2-notifications';
import { 
    SimpleComponent, 
    ConfirmarComponent, 
    FolderComponent, 
    FileComponent
} from '../modal/modal';
import { Router } from '@angular/router';
import { FilesService } from '../services/files.service';
import { isArray } from 'util';
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    constructor(
        private dialog: MatDialog,
        private snack: MatSnackBar,
        private router: Router,
        private files: FilesService,
        private notify: NotificationsService
    ){}
    public userName: string = "aiCloud";
    public dataSource: Array<any> = [];
    ngOnInit(){
        if(localStorage.getItem('u_info')){
            try{
                let data: any = localStorage.getItem('u_info');
                data = JSON.parse(atob(data));
                this.userName = data.nombre + " " + data.apellido;
            }catch(ex){
                this.userName = "aiCloud";
            }
        }
        this.showOf(this.path);
    }
    private _path: string = "/";
    public set path(val: string){
        this._path = val;
    }
    public get path(): string{
        return this._path;
    }
    makeSnack(txt: string, t?: number): void{
        this.snack.open(txt, null, { duration: t | 1500 });
    }
    simpleModal(title: string, message: string): void{
        SimpleComponent.run(title, message, () => this.dialog.closeAll());
        this.dialog.open(SimpleComponent);
    }
    confirmModal(title: string, message: string, fs: Function, fe?: Function): void{
        if(!fe) ConfirmarComponent.run(title, message, fs, () => this.dialog.closeAll());
        else ConfirmarComponent.run(title, message, fs, fe);
        this.dialog.open(ConfirmarComponent);
    }
    addFolder(): void{
        FolderComponent._pathToCreate = this.path;
        FolderComponent._close = () => this.dialog.closeAll();
        this.dialog.open(FolderComponent);
    }
    addFile(): void {
        FileComponent._pathToCreate = this.path;
        FileComponent._close = () => this.dialog.closeAll();
        this.dialog.open(FileComponent);
    }
    logout(): void{
        this.confirmModal('¡Un momento!', 
        '¿Estás seguro de que quieres cerrar sesión ahora?', () => {
            localStorage.removeItem('token');
            localStorage.removeItem('u_info');
            this.router.navigate(['login']);
            this.dialog.closeAll();
        });
    }
    raiz(): void{
        this.path = "/";
        this.showOf(this.path);
    }
    showOf(path: string): void{
        this.files.show(path).then(response => {
            if(response.data && isArray(response.data)){
                let data: Array<any> = [];
                let num: number = 0;
                response.data.forEach(element => {
                    let reg = new RegExp(/^[\d\D]{1,}[.][\d\D]{1,}$/gi);
                    data.push({
                        nombre: element,
                        id: ++num,
                        type: reg.exec(element) ? 'attach_file' : 'folder'
                    });
                });
                this.dataSource = data;
            }
        }).catch(err => {
            this.notify.error("¡Ups!", 'No se pueden obtener los datos.', {
                clickToClose: true
            });
        });
    }
    backToNewRoute(path: string): void{
        let route: string = path;
        let nRoute: Array<any> = [], cRoute: Array<any> = [];
        nRoute = route.split("/");
        nRoute.forEach(el => {
            if(el != "") cRoute.push(el);
        });
        cRoute.pop();
        route = "/";
        cRoute.forEach(el => {
            route += el + "/";
        });
        this.path = route;
        this.showOf(route);
    }
    sintantyc(object: any): void{
        if(object.type === "folder"){
            this.path += object.nombre + "/";
            this.showOf(this.path);
        } else if(object.type === "attach_file"){

        } else this.makeSnack('Archivo dañado, datos desconocidos.');
    }
}
