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
    public dataSharedFiles: Array<any> = [];
    ngOnInit(){
        if(localStorage.getItem('u_info')){
            try{
                let data: any = localStorage.getItem('u_info');
                data = JSON.parse(atob(data));
                this.userName = data.nombre + " " + data.apellido;
            }catch(ex){
                this.userName = "MyCloud";
            }
        }
        this.showOf(this.path);
        this.showShared();
    }
    private _path: string = "/";
    public set path(val: string){
        this._path = val;
    }
    public get path(): string{
        return this._path;
    }
    makeSnack(txt: string, t?: number): void{
        this.snack.open(txt, null, { duration: t || 1500 });
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
        FolderComponent._update = () => this.showOf(this.path);
        this.dialog.open(FolderComponent);
    }
    addFile(): void {
        FileComponent._pathToCreate = this.path;
        FileComponent._close = () => this.dialog.closeAll();
        FileComponent._update = () => this.showOf(this.path);
        this.dialog.open(FileComponent);
    }
    logout(): void{
        this.confirmModal('¡Un momento!', 
        '¿Estás seguro de que quieres cerrar sesión ahora?', () => {
            localStorage.removeItem('token');
            localStorage.removeItem('u_info');
            this.router.navigate(['/']);
            this.dialog.closeAll();
        });
    }
    raiz(): void{
        this.path = "/";
        this.showOf(this.path);
    }
    showShared(): void{
        this.files.getShared().then(response => {
            if(isArray(response)){
                this.dataSharedFiles = response;
            } else this.makeSnack("No se obtuvo una respuesta correcta del servidor.");
        }).catch(() => {
            this.makeSnack('No se pudo obtener la información de los archivos compartidos.');
        });
    }
    getURL(id: any): string{
        let idCoded: string = btoa(id);
        return "http://localhost:4200/download/" + idCoded;
    }
    quitShare(filename: string): void{
        this.confirmModal("¡Espera!", "¿Estás seguro que deseas dejar de compartir este archivo?", () => {
            this.files.quitShare(filename).then(response => {
                if(response.success){
                    this.makeSnack("Elemento quitado de la lista.");
                    this.showShared();
                }
                else this.makeSnack("No se obtuvo la respuesta esperada.");
            }).catch(() => {
                this.makeSnack("Ocurrió un error al quitar el elemento de la lista.");
            });
            this.dialog.closeAll();
        });
    }
    copyToClipboard(data: string): void{
        function copiarAlPortapapeles(mime) {
            var aux = document.createElement("input");
            aux.setAttribute("value", mime);
            document.body.appendChild(aux);
            aux.select();
            document.execCommand("copy");
            document.body.removeChild(aux);
        }
        copiarAlPortapapeles(data);
        this.makeSnack("URL copiada al portapapeles.");
    }
    showOf(path: string): void{
        this.dataSource = [];
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
            } else if(response.error) this.makeSnack(response.error, 2500);
            else this.makeSnack("Error indefinido, en un momento lo solucionaremos.");
        }).catch(() => {
            this.notify.error("¡Ups!", 'No se pueden obtener los datos.', {
                clickToClose: true,
                timeOut: 3000
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
    downloadPath(filename: string): void{
        this.files.downloadRoute(this.path, filename).then(response => {
            if(response.url) window.open(response.url);
            else this.makeSnack('Dirección URL dañada.');
        }).catch(() => {
            this.makeSnack('Archivo dañado, no se puede descargar.', 3500);
        });
    }
    sintantyc(object: any): void{
        if(object.type === "folder"){
            this.path += object.nombre + "/";
            this.showOf(this.path);
        } else if(object.type === "attach_file"){
            this.downloadPath(object.nombre);
        } else this.makeSnack('Archivo dañado, datos desconocidos.');
    }
    deleteFile(filename: string, tipo: string){
        this.confirmModal("¡Un momento!", "¿Estás seguro que deseas eliminar a '" + filename + "' de forma permanente?", () => {
            let dir: string = this.path + filename;
            let type: string = (tipo == 'folder') ? 'is' : 'notis';
            this.files.deleteOne(dir, type).then(response => {
                if(response.success){
                    this.makeSnack(response.success);
                    this.refreshData();
                } else if(response.error) this.makeSnack(response.error, 2500);
                else this.makeSnack("No se recuperó la informacion correcta del servidor.");
                this.dialog.closeAll();
            }).catch(() => {
                this.makeSnack("No se pudo eliminar el objeto.", 2500);
                this.dialog.closeAll();
            });
        });
    }
    refreshData(): void{
        this.showOf(this.path);
        this.showShared();
    }
    share(filename: string): void{
        let dir = this.path + filename;
        this.confirmModal("¡Espera!", "¿Estás seguro de que quieres compartir este archivo?", () => {
            this.files.newshare(dir).then(response => {
                if(response.success && response.url){
                    this.simpleModal(response.success, response.url);
                    if(response.code && response.code == "ok") this.showShared();
                } else if(response.error) this.makeSnack(response.error, 2500); 
                else this.makeSnack("Se compartió, pero puede que algo haya salido mal.");
            }).catch(() => {
                this.makeSnack("No se pudo compartir este archivo.");
            });
            this.dialog.closeAll();
        });
    }
}
