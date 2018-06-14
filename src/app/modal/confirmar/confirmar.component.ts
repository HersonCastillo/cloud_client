import { Component } from '@angular/core';

@Component({
    selector: 'app-confirmar',
    templateUrl: './confirmar.component.html'
})
export class ConfirmarComponent {
    constructor(){}
    private static _title: string = "Título por defecto.";
    private static _message: string = "Este es un mensaje.";
    private static _FirstAction: Function;
    private static _SecondAction: Function;
    public static setTitle(str: string): void{
        ConfirmarComponent._title = str;
    }
    public static setMessage(str: string): void{
        ConfirmarComponent._message = str;
    }
    public static setFirstAction(f: Function){
        ConfirmarComponent._FirstAction = f;
    }
    public static setSecondAction(f: Function){
        ConfirmarComponent._SecondAction = f;
    }
    public get title(){
        return ConfirmarComponent._title;
    }
    public get message(){
        return ConfirmarComponent._message;
    }
    public getFirstAction(){
        ConfirmarComponent._FirstAction();
    }
    public getSecondAction(){
        ConfirmarComponent._SecondAction();
    }
    public static run(title: string, message: string, fs: Function, fe: Function): void{
        ConfirmarComponent.setTitle(title);
        ConfirmarComponent.setMessage(message);
        ConfirmarComponent.setFirstAction(fs);
        ConfirmarComponent.setSecondAction(fe);
    }
}
