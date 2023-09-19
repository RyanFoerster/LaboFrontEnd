import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../shared/services/auth.service";
import {User} from "../../../shared/models/User";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {DevInfo} from "../../../shared/models/DevInfo";
import {Observable, tap} from "rxjs";
import {UserService} from "../../../shared/services/user.service";
import {Recruiter} from "../../../shared/models/Recruiter";
import {Router, RouterLink} from "@angular/router";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    standalone: true,
    imports: [
        NgIf,
        ReactiveFormsModule,
        AsyncPipe,
        NgForOf,
        RouterLink
    ],
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    connectedUser ?: User;
    devInfoSub!: Observable<DevInfo>;
    recruiterSub!: Observable<Recruiter>;
    editPassword: boolean = false;
    newPasswordForm: FormGroup;

    constructor(private _authService: AuthService,
                private _userService: UserService,
                private _FB: FormBuilder,
                private _router: Router) {
        this.newPasswordForm = _FB.group(
            {
                password: [null, [
                    Validators.required,
                    Validators.minLength(6),
                    Validators.pattern(/^(?=.*[!=@#$%^&*()_+{}\[\]:;<>,.?~\-]).*(?=.*[A-Z]).*(?=.*[0-9]).*$/)
                ]
                ]
            }
        )
    }

    ngOnInit(): void {
        this.connectedUser = this._authService.user

        if (this.connectedUser && this.connectedUser?.roles.includes("DEVELOPER"))
            this.devInfoSub = this._userService.getDevInfoFromServer(this.connectedUser?.id)

        if (this.connectedUser && this.connectedUser.roles.includes("RECRUITER"))
            this.recruiterSub = this._userService.getRecruiterInfoFromServer(this.connectedUser.id)
    }


    updateDevPassword() {
        this._userService.updateDevPassword(this.newPasswordForm.value).pipe(
            tap(() => this._router.navigateByUrl('/home'))
        ).subscribe();
    }

    updateRecPassword() {
        this._userService.updateRecPassword(this.newPasswordForm.value).pipe(
            tap(() => this._router.navigateByUrl('/home'))
        ).subscribe();
    }

    setPassword() {
        this.editPassword = !this.editPassword;
    }
}
