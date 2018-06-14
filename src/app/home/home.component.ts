import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { SimpleComponent, ConfirmarComponent } from '../modal/modal';
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    constructor(
        private dialog: MatDialog,
        private snack: MatSnackBar
    ){}
    ngOnInit(){}
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

    }
    addFile(): void {
        
    }
}
