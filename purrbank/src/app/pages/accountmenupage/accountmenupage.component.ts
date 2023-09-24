import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/services/data.services';

@Component({
    selector: 'app-accountmenupage',
    templateUrl: './accountmenupage.component.html',
    styleUrls: ['./accountmenupage.component.css']
})
export class AccountmenupageComponent implements OnInit{
    constructor(
        private router: Router,
        private service: DataService,
        private toastr: ToastrService
    ) { }
    ngOnInit(): void {
    }
    delete() {
        this
            .service
            .deleteUser(localStorage.getItem('userId'))
            .subscribe({
                next: response=> {
                    
                    if(response.status ==  HttpStatusCode.NoContent)
                    {
                        this.toastr.success('Conta excluída com sucesso!');
                        this.router.navigate(['/']);    
                    }
                    else
                    {
                        this.toastr.error('Um erro aconteceu, tente novamente!');
                    }
                }
            });     

    }
}


