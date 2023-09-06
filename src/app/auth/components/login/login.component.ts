import {Component} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {Router, RouterLink} from "@angular/router";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {AuthService} from "../../../shared/services/auth.service";
import {data} from "autoprefixer";
import {SessionService} from "../../../shared/services/session.service";

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    imports: [
        MatButtonModule,
        RouterLink,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule
    ],
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {

    loginForm: FormGroup

    constructor(private _formBuilder: FormBuilder,
                private _authService: AuthService,
                private _sessionService: SessionService,
                private _router: Router) {

        this.loginForm = _formBuilder.group({
            username: [null, [Validators.required]],
            password: [null, [Validators.required]]
        })
    }


    login() {
        let username: string = this.loginForm.get("username")?.value
        let password: string = this.loginForm.get("password")?.value

        this._authService.login(username, password).subscribe(data => {
            this._sessionService.addToSession(data)
            this._router.navigateByUrl("/home")
        })
    }

}
