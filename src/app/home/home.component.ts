import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { 
    SimpleComponent, 
    ConfirmarComponent, 
    FolderComponent 
} from '../modal/modal';
import { Router } from '@angular/router';
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    constructor(
        private dialog: MatDialog,
        private snack: MatSnackBar,
        private router: Router
    ){}
    public userName: string = "aiCloud";
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
    raiz(): void{}
    compartidosYo(): void{}
    compartidosOtros(): void{}
}
