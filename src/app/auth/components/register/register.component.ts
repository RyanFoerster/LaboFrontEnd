import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {NgForOf, NgIf} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {AuthService} from "../../../shared/services/auth.service";

@Component({
    selector: 'app-register',
    standalone: true,
    templateUrl: './register.component.html',
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        NgForOf,
        NgIf,
        MatButtonModule
    ],
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

    registerForm: FormGroup
    roles: string[] = ["RECRUITER", "DEVELOPER"]

    constructor(private _formBuilder: FormBuilder,
                private _authService: AuthService) {

        this.registerForm = _formBuilder.group({
            username: [null, [Validators.required]],
            password: [null, [Validators.required]],
            firstName: [null, [Validators.required]],
            lastName: [null, [Validators.required]],
            email: [null, [Validators.required, Validators.email]]
        })
    }

    register(): void {
        if(this.registerForm.valid){
            console.log(this.registerForm.value)
            this._authService.register(this.registerForm.value).subscribe(data => console.log(data))
        }
    }
}
