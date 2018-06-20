import { Component } from '@angular/core';
import { FilesService } from '../../services/files.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationsService } from 'angular2-notifications';
@Component({
    selector: 'app-file',
    templateUrl: './file.component.html',
    styleUrls: ['./file.component.css']
})
export class FileComponent {
    constructor(
        private files: FilesService,
        private snack: MatSnackBar,
        private notif: NotificationsService
    ){}
    public static _pathToCreate: string = "/";
    public static _close: Function;
    public static _update: Function;
    public file: File;
    close(): void{
        FileComponent._close();
    }
    update(): void{
        FileComponent._update();
    }
    uploadChange(files: any): void{
        this.file = files[0];
    }
    makeSnack(txt: string, t?: number): void{
        this.snack.open(txt, null, { duration: t | 1500 });
    }
    upload(): void{
        if(this.file){
            this.close();
            this.notif.info('Subiendo archivo...', 'Se te notificará cuando se haya subido.');
            this.files.upload(this.file, FileComponent._pathToCreate).then(response => {
                if(response.success) if(response.success != "no-process"){
                    this.notif.success('¡Perfecto!', 'El archivo ' + this.file.name + " fue subido exitosamente.", {
                        timeOut: 2500,
                        clickToClose: true
                    });
                    this.update();
                } else if(response.error) this.notif.error("¡Ups!", response.error, {
                    timeOut: 3500,
                    clickToClose: true
                }); 
                else this.notif.warn("¡Ups!", "No se pudo subir el archivo correctamente.");
            }).catch(() => {
                this.notif.error("¡Muy mal!", "No se puede subir este archivo :(", {
                    timeOut: 3500,
                    clickToClose: true
                });
                this.close();
            });
        } else this.makeSnack('Nada para subir.');
    }
}
