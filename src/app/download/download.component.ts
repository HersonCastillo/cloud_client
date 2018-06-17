import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
//import { FilesService } from '../services/files.service';
@Component({
    selector: 'app-download',
    templateUrl: './download.component.html',
    styleUrls: ['./download.component.css']
})
export class DownloadComponent implements OnInit {

    constructor(
        private router: Router,
        private snat: ActivatedRoute
    ){}

    ngOnInit() {
        this.snat.paramMap.subscribe(paramKey => {
            try{
                let id = atob(paramKey.get('id'));
            }catch(ex){
                this.router.navigate(['error']);
            }
        });
    }
    toLogin(): void{
        this.router.navigate(['login']);
    }
}
