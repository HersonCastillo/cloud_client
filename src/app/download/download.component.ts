import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FilesService } from '../services/files.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
    selector: 'app-download',
    templateUrl: './download.component.html',
    styleUrls: ['./download.component.css']
})
export class DownloadComponent implements OnInit {

    constructor(
        private router: Router,
        private snat: ActivatedRoute,
        private files: FilesService,
        private snack: MatSnackBar
    ){}
    public isShow: boolean = true;
    public isLoaded: boolean = false;
    private url: string = "";
    public infoFile = {
        name: "",
        size: ""
    }
    ngOnInit() {
        function bytesToSize(bytes: number) {
            var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
            if (bytes == 0) return '0 Byte';
            var i = Math.floor(Math.log(bytes) / Math.log(1024));
            return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
        }
        this.snat.paramMap.subscribe(paramKey => {
            try{
                let id = atob(paramKey.get('id'));
                this.files.getDataDownloadFile(id).then(response => {
                    if(response.success){
                        this.isLoaded = true;
                        this.url = response.url;
                        this.infoFile.name = response.file;
                        this.infoFile.size = bytesToSize(response.size);
                    }
                }).catch(err => {
                    this.makeSnack("No se pudo obtener la información del archivo.");
                    this.isShow = false;
                });
            }catch(ex){
                this.router.navigate(['error']);
            }
        });
    }
    makeSnack(txt: string, t?: number): void{
        this.snack.open(txt, null, { duration: t || 1500 });
    }
    toLogin(): void{
        this.router.navigate(['login']);
    }
    open(){
        if(this.isLoaded) window.open(this.url);
    }
}
