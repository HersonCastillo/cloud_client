import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    constructor(
        private snack: MatSnackBar,
        private loginProvider: LoginService,
        private router: Router
    ){}
    public userDetails: any = {
        email: "",
        pass: ""
    };
    makeSnack(txt: string, time?: number){
        this.snack.open(txt, null, { duration: time || 1500 });
    }
    ngOnInit(){}
    login(): void{
        let email: string = this.userDetails.email.toString();
        let pass: string = this.userDetails.pass.toString();
        email = email.trim();
        pass = pass.trim();
        if(email.length >= 1 && pass.length >= 1){
            let inicia: Date = new Date();
            let final: Date = new Date();
            final.setHours(inicia.getHours() + 3);
            this.loginProvider.login({
                email: email,
                pass: pass,
                inicia: inicia,
                final: final
            }).then(response => {
                if(response.success){
                    localStorage.setItem('token', response._accesstoken_);
                    this.loginProvider.validateToken().then(__token => {
                        if(__token.success && __token.user){
                            let userInfo = __token.user;
                            userInfo = btoa(JSON.stringify(userInfo));
                            localStorage.setItem('u_info', userInfo);
                        } else this.makeSnack('La información del usuario está dañada.');
                    }).catch(__err => {
                        this.makeSnack('No se pudo obtener la información del usuario.', 2500);
                    });
                    this.router.navigate(['home']);
                } else if(response.error) this.makeSnack(response.error, 2500);
                else this.makeSnack("No se encontró la respuesta esperada.");
            }).catch(err => {
                this.makeSnack('Ocurrió un error al obtener el usuario.', 3500);
                console.error(err);
            });
        } else this.makeSnack('Algún campo está vacío.', 2500);
    }
}
