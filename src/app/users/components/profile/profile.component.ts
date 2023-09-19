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
import {TechnologyBackEnd} from "../../../shared/models/enums/TechnologyBackEnd";
import {TechnologyFrontEnd} from "../../../shared/models/enums/TechnologyFrontEnd";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    standalone: true,
    imports: [
        NgIf,
        ReactiveFormsModule,
        AsyncPipe,
        NgForOf,
        RouterLink,
        MatFormFieldModule,
        MatOptionModule,
        MatSelectModule
    ],
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    connectedUser ?: User;
    devInfoSub!: Observable<DevInfo>;
    recruiterSub!: Observable<Recruiter>;
    editPassword: boolean = false;
    editProfile: boolean = false;
    newPasswordForm: FormGroup;
    devInfoForm: FormGroup
    companyForm: FormGroup
    addressForm: FormGroup
    technologyBackEnd = Object.values(TechnologyBackEnd)
    technologyFrontEnd = Object.values(TechnologyFrontEnd)

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

        this.devInfoForm = _FB.group({
            firstName: [null, []],
            lastName: [null, []],
            email: [null, [ Validators.email]],
            description: ["", []],
            birthDate: [null, []],
            technologyBackEnds: [null, []],
            technologyFrontEnds: [null, []],
            gitHub: ["", []],
            cv: ["", []],
            linkedIn: ["", []],
            pseudo: ["", []]
        })

        this.addressForm = this._FB.group({
            street: [null, [Validators.required]],
            number: [null, [Validators.required]],
            city: [null, [Validators.required]],
            zipcode: [null, [Validators.required]],
            country: [null, [Validators.required]]
        })

        this.companyForm = _FB.group({
            name: [null, [Validators.required]],
            description: [null, [Validators.required]]
        })
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

    modifyProfile() {
        this.editProfile = !this.editProfile;
    }

    updateDevProfile() {
        this._userService.updateDev(this.devInfoForm.value).pipe(
            tap(() => this._router.navigateByUrl(`/profile/${this.connectedUser?.id}`)
            )).subscribe();
    }
}
