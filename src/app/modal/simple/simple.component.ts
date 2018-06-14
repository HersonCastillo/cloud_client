import { Component } from '@angular/core';

@Component({
    selector: 'app-simple',
    templateUrl: './simple.component.html'
})
export class SimpleComponent {
    constructor(){}
    private static _title: string = "Título por defecto.";
    private static _message: string = "Este es un mensaje.";
    private static _action: Function;
    public static setTitle(str: string): void{
        SimpleComponent._title = str;
    }
    public static setMessage(str: string): void{
        SimpleComponent._message = str;
    }
    public static setAction(f: Function){
        SimpleComponent._action = f;
    }
    public get title(){
        return SimpleComponent._title;
    }
    public get message(){
        return SimpleComponent._message;
    }
    public getAction(){
        SimpleComponent._action();
    }
    public static run(title: string, message: string, f: Function): void{
        SimpleComponent.setTitle(title);
        SimpleComponent.setMessage(message);
        SimpleComponent.setAction(f);
    }
}
