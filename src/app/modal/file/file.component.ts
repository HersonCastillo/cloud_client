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
    public file: File;
    close(): void{
        FileComponent._close();
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
                    this.notif.success('¡Perfecto!', 'El archivo ' + this.file.name + " fue subido exitosamente.");
                }
            }).catch(() => {
                this.makeSnack('Ocurrió un error al subir el archivo, puede que el tamaño o el nombre no sean correctos.');
                this.close();
            });
        } else this.makeSnack('Nada para subir.');
    }
}
