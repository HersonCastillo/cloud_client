import { Component } from '@angular/core';
import { FilesService } from '../../services/files.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
    selector: 'app-file',
    templateUrl: './file.component.html',
    styleUrls: ['./file.component.css']
})
export class FileComponent {
    constructor(
        private files: FilesService,
        private snack: MatSnackBar
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
            console.log(this.file)
            this.files.upload(this.file, FileComponent._pathToCreate).then(response => {
                console.log(response);
            }).catch(() => {
                this.makeSnack('Ocurrió un error al subir el archivo.');
                this.close();
            });
        }
    }
}
