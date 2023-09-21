import {Component} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../../shared/services/auth.service";
import {NgIf} from "@angular/common";

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    imports: [
        RouterLink,
        FormsModule,
        ReactiveFormsModule,
        NgIf
    ],
    styleUrls: ['./login.component.scss'],
    animations: []
})
export class LoginComponent {

    loginForm: FormGroup

    constructor(private _formBuilder: FormBuilder,
                private _authService: AuthService,
                private _router: Router) {

        this.loginForm = _formBuilder.group({
            username: [null, [Validators.required]],
            password: [null, [Validators.required]]
        })
    }


    login() {
        let username: string = this.loginForm.get("username")?.value
        let password: string = this.loginForm.get("password")?.value

        this._authService.login(username, password)
            .subscribe({
                next : data=> {
                    console.log(data)
                    this._router.navigateByUrl("/home")
                },
                error: console.error
            })
    }

}
