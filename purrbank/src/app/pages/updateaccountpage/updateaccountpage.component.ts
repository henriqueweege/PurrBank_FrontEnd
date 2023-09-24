import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/services/data.services';
import { User } from '../models/user.model';

@Component({
    selector: 'app-updateaccountpage',
    templateUrl: './updateaccountpage.component.html',
    styleUrls: ['./updateaccountpage.component.css']
})
export class UpdateaccountpageComponent implements OnInit {
    public form: FormGroup;
    public busy = false;

    constructor(
        private router: Router,
        private service: DataService,
        private fb: FormBuilder,
        private toastr: ToastrService
    ) {
        var user = new User(-1, "", "", "");
        this.service.getUserById(localStorage.getItem('userId')).subscribe
            (
                (data) => {
                    this.busy = false;
                    if (data.success) {
                        data.result.forEach(y => user = new User(y.id, y.firstName, y.lastName, y.email));
                        this.form.setValue({
                            firstName: user.firstName,
                            lastName: user.lastName            
                        })
                    }
                    else {
                        this.router.navigate(['accountmainpage'])
                        this.toastr.error("Algum erro aconteceu, por favor, tente novamente");
                    }
                }
            );
        this.form = this.fb.group({
            firstName: [user.firstName, Validators.compose([
                Validators.minLength(0),
                Validators.maxLength(80),
                Validators.required
            ])],
            lastName: [user.lastName, Validators.compose([
                Validators.minLength(0),
                Validators.maxLength(80),
                Validators.required
            ])]
        });
        
       
    }

    ngOnInit() {
    }

    submit() {
        this.busy = true;
        this
            .service
            .updateUser(this.form.value, localStorage.getItem('userId'))
            .subscribe(
                (data: any) => {
                    this.busy = false;
                    this.toastr.success(data.message, 'Cadastro atualizado com sucesso!');
                    this.router.navigate(['accountmainpage']);
                }
            );
    }

}