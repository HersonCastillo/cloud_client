import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from "../services/login.service";
import { Router } from '@angular/router';

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
      const isSubmitted = form && form.submitted;
      return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
  }
@Component({
    selector: 'app-registrar',
    templateUrl: './registrar.component.html',
    styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {
    public condiciones: boolean = false;
    constructor(
        private snack: MatSnackBar,
        private login: LoginService,
        private router: Router
    ){}
    ngOnInit(){}
    public load: boolean = false;
    public matcher = new MyErrorStateMatcher();
    public email = new FormControl('', [Validators.required, Validators.email]);
    public nombre = new FormControl('', [Validators.required]);
    public apellido = new FormControl('', [Validators.required]);
    public password = {
        test1: new FormControl('', [Validators.required]),
        test2: new FormControl('', [Validators.required])
    }
    public data = {
        nombre: "",
        apellido: "",
        email: "",
        password: {
            t1: "",
            t2: ""
        }
    }
    makeSnack(txt: string, t?: number): void{
        this.snack.open(txt, null, { duration: t || 1500 });
    }
    goToLogin(): void{
        this.router.navigate(['login']);
    }
    registrar(): void{
        if(
            !this.email.hasError('email') &&
            !this.email.hasError('required') &&
            !this.nombre.hasError('required') &&
            !this.apellido.hasError('required') &&
            !this.password.test1.hasError('required') &&
            !this.password.test2.hasError('required')
        ){
            if(this.condiciones){
                if(this.data.password.t1 === this.data.password.t2){
                    let fInicia = new Date();
                    let fFinaliza = new Date();
                    fFinaliza.setHours(fFinaliza.getHours() + 3);
                    let dataToSend = {
                        nombre: this.data.nombre,
                        apellido: this.data.apellido,
                        email: this.data.email,
                        pass: this.data.password.t2,
                        inicia: fInicia,
                        final: fFinaliza
                    }
                    this.load = true;
                    this.login.createAccount(dataToSend).then(r => {
                        if(r.success){
                            this.makeSnack(r.success);
                            localStorage.setItem('token', r._accesstoken_);
                            this.login.validateToken().then(__token => {
                                if(__token.success && __token.user){
                                    let userInfo = __token.user;
                                    userInfo = btoa(JSON.stringify(userInfo));
                                    localStorage.setItem('u_info', userInfo);
                                    this.router.navigate(['home']);
                                } else this.makeSnack('La información del usuario está dañada.');
                            }).catch(__err => {
                                this.makeSnack('No se pudo obtener la información del usuario.', 2500);
                            });
                        } else if(r.error) this.makeSnack(r.error, 2500);
                        else this.makeSnack("Error indefinido, lo solucionaremos lo más pronto posible.");
                        this.load = false;
                    }).catch(() => {
                        this.makeSnack("Ocurrió un error al crear la cuenta. Verifique los datos.");
                        this.load = false;
                    });
                } else this.makeSnack("Las contraseñas no son iguales.");
            } else this.makeSnack("Se tienen que aceptar las condiciones de uso.");
        } else this.makeSnack("Aún tienes campos que rellenar.");
    }
}
