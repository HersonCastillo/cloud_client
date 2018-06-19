import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from './material.module';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SimpleNotificationsModule } from 'angular2-notifications';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { SimpleComponent } from './modal/simple/simple.component';
import { ConfirmarComponent } from './modal/confirmar/confirmar.component';
import { FolderComponent } from './modal/folder/folder.component';
import { FileComponent } from './modal/file/file.component';
import { DownloadComponent } from './download/download.component';
import { RegistrarComponent } from './registrar/registrar.component';

const appRoutes: Routes = [
    { path: 'login',  component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'download/:id', component: DownloadComponent},
    { path: 'registrar', component: RegistrarComponent },
    { path: '**', component: ErrorComponent }
];

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        ErrorComponent,
        HomeComponent,
        SimpleComponent,
        ConfirmarComponent,
        FolderComponent,
        FileComponent,
        DownloadComponent,
        RegistrarComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes),
        MaterialModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        SimpleNotificationsModule.forRoot()
    ],
    providers: [],
    bootstrap: [AppComponent],
    entryComponents: [
        SimpleComponent,
        ConfirmarComponent,
        FileComponent,
        FolderComponent
    ]
})
export class AppModule { }
