import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/internal/Observable';
import { DataService } from 'src/app/services/data.services';
import { User } from '../models/user.model';

@Component({
    selector: 'app-homepage',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
    public form: FormGroup;
    public busy = false;

    constructor(
        private router: Router,
        private service: DataService,
        private fb: FormBuilder,
        private toastr: ToastrService
    ) {
        this.form = this.fb.group({
            email: ['', Validators.compose([
                Validators.minLength(5),
                Validators.maxLength(120),
                Validators.required,
                Validators.email
            ])]
        });
    }

    ngOnInit() {
    }

    submit() {
        var user : User;
        this.busy = true;
        this
            .service
            .getUserByEmail(this.form.value)
            .subscribe({
                next: data => {
                    
                    this.busy = false;
                    if(data && data.success && data.result.length > 0){
                        this.toastr.success(`Bem-vindo(a)`);
                        data.result.forEach(y=> localStorage.setItem("userId", y.id.toString()));
                        this.router.navigate(['accountmainpage'])
                    }
                    else
                    {
                        this.toastr.error("E-mail inválido. Por favor, tente novamente");
                        this.router.navigate(['/'])

                    }
                },
                error: error => 
                {
                    this.toastr.error('Um erro ocorreu, tente novamente!');
                }
            });;
            // .subscribe(
            //     (data) => {
            //         this.busy = false;
            //         if(data.success){
            //             this.toastr.success(`Bem-vindo(a)`);
            //             data.result.forEach(y=> localStorage.setItem("userId", y.id.toString()));
            //             this.router.navigate(['accountmainpage'])
            //         }
            //         else
            //         {
            //             this.toastr.error("Algum erro aconteceu, por favor, tente novamente");
            //         }
            //     }
            // );   
    }

}