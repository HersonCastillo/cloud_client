import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-folder',
    templateUrl: './folder.component.html',
    styleUrls: ['./folder.component.css']
})
export class FolderComponent implements OnInit {
    constructor() { }
    ngOnInit(){}
    public static _pathToCreate: string = "/";
    public carpetaName: string = "";
    public get pathToCreate(): string{
        return FolderComponent._pathToCreate;
    }
    public static _close: Function;
    public close(){
        FolderComponent._close();
    }
    dinCreate(realPath: string, newFolder): string{
        if(realPath === "/") return "/" + newFolder;
        else return realPath + newFolder;
    }
}
