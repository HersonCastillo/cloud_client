import { Component, OnInit } from '@angular/core';
import { FolderService } from '../../services/folder.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
    selector: 'app-folder',
    templateUrl: './folder.component.html',
    styleUrls: ['./folder.component.css']
})
export class FolderComponent implements OnInit {
    constructor(
        private folder: FolderService,
        private snack: MatSnackBar
    ) { }
    ngOnInit(){}
    public static _pathToCreate: string = "/";
    public static _update: Function;
    public carpetaName: string = "";
    public get pathToCreate(): string{
        return FolderComponent._pathToCreate;
    }
    public static _close: Function;
    public close(){
        FolderComponent._close();
    }
    public update(){
        FolderComponent._update();
    }
    dinCreate(realPath: string, newFolder): string{
        if(realPath === "/") return "/" + newFolder;
        else return realPath + newFolder;
    }
    crear(): void{
        this.carpetaName = this.carpetaName.trim();
        if(this.carpetaName.length >= 1){
            let reg = new RegExp(/^[\d\D]{1,}[.][\d\D]{1,}$/gi);
            if(!reg.exec(this.carpetaName)){
                if(FolderComponent._pathToCreate !== "/")
                    this.carpetaName = FolderComponent._pathToCreate + this.carpetaName;
                this.folder.createFolder(this.carpetaName).then(response => {
                    if(response.success){
                        this.carpetaName = "";
                        this.makeSnack('Carpeta creada con éxito.', 2500);
                    }
                    this.close();
                    this.update();
                }).catch(err => {
                    this.makeSnack("No se pudo crear la carpeta, verifique el nombre.");
                    this.carpetaName = "";
                });
            } else this.makeSnack("No se permiten los puntos en el nombre.");
        }
    }
    makeSnack(txt: string, t?: number): void{
        this.snack.open(txt, null, { duration: t | 1500 });
    }
}
