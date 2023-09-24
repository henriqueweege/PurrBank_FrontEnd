
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/services/data.services';

@Component({
    selector: 'app-signuppage',
    templateUrl: './signuppage.component.html',
    styleUrls: ['./signuppage.component.css']
})
export class SignuppageComponent implements OnInit {
    public form: FormGroup;
    public busy = false;

    constructor(
        private router: Router,
        private service: DataService,
        private fb: FormBuilder,
        private toastr: ToastrService
    ) {
        this.form = this.fb.group({
            firstName: ['', Validators.compose([
                Validators.minLength(3),
                Validators.maxLength(80),
                Validators.required
            ])],
            lastName: ['', Validators.compose([
                Validators.minLength(2),
                Validators.maxLength(80),
                Validators.required
            ])],
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
        this.busy = true;
        this
            .service
            .createUser(this.form.value)
            .subscribe({
                next: data => {
                    if (data.success == false && data.message?.includes("email já está cadastrado.")) {
                        this.busy = false;
                        this.toastr.error('Email já cadastrado. Por favor, tente novamente.');
                    }
                    else {
                        this.busy = false;
                        this.toastr.success('Cadastro realizado com sucesso!');
                        this.router.navigate(['/']);
                    }

                },
                error: err => {
                    
                    this.busy = false;
                    this.toastr.error('Algum erro ocorreu. Por favor, tente novamente.');
                }
            }


            );
    }

}