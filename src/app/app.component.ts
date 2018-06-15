import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    public options = {
        showProgressBar: false,
        clickToClose: false,
        clickIconToClose: false,
        maxStack: 1
    }
}