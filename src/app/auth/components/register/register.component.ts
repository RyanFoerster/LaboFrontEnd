import {Component, signal} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {AuthService} from "../../../shared/services/auth.service";
import {TechnologyBackEnd} from "../../../shared/models/enums/TechnologyBackEnd";
import {TechnologyFrontEnd} from "../../../shared/models/enums/TechnologyFrontEnd";
import {DevRegister} from "../../../shared/models/DevRegister";
import {Address} from "../../../shared/models/Address";
import {DevInfoForm} from "../../../shared/models/DevInfoForm";
import {RecruiterRegister} from "../../../shared/models/RecruiterRegister";
import {CompanyForm} from "../../../shared/models/CompanyForm";
import {RouterLink} from "@angular/router";
import {Observable} from "rxjs";

@Component({
    selector: 'app-register',
    standalone: true,
    templateUrl: './register.component.html',
    imports: [
        ReactiveFormsModule,
        NgForOf,
        NgIf,
        FormsModule,
        NgClass,
        RouterLink
    ],
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

    userInfoForm: FormGroup
    devInfoForm: FormGroup
    companyForm: FormGroup
    addressForm: FormGroup
    technologyBackEnd = Object.values(TechnologyBackEnd)
    technologyFrontEnd = Object.values(TechnologyFrontEnd)
    isRecruiter: boolean = false
    roles: string[] = ["RECRUITER", "DEVELOPER"]
    isLinear = false;
    step= signal(1)

    constructor(private _formBuilder: FormBuilder,
                private _authService: AuthService) {

        this.userInfoForm = _formBuilder.group({
            username: [null, [
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(20)
            ]],
            password: [null, [
                Validators.required,
                Validators.minLength(6),
                Validators.pattern(/^(?=.*[!=@#$%^&*()_+{}\[\]:;<>,.?~\-]).*(?=.*[A-Z]).*(?=.*[0-9]).*$/)
            ]],
            firstName: [null, [Validators.required]],
            lastName: [null, [Validators.required]],
            email: [null, [Validators.required, Validators.email]]
        })

        this.devInfoForm = _formBuilder.group({
            description: [null, []],
            birthDate: [null, []],
            technologyBackEnds: [null, []],
            technologyFrontEnds: [null, []],
            github: [null, []],
            linkedIn: [null, []],
            pseudo: [null, []]
        })

        this.addressForm = this._formBuilder.group({
            street: [null, []],
            number: [null, []],
            city: [null, []],
            zipcode: [null, []],
            country: [null, []]
        })

        this.companyForm = _formBuilder.group({
            name: [null, [Validators.required]],
            description: [null, [Validators.required]]
        })
    }

    register(): void {
        if (!this.isRecruiter) {
            if (this.userInfoForm.valid) {
                const user = this.mapToUser(this.userInfoForm.value, this.devInfoForm.value, this.addressForm.value)
                this._authService.registerDev(user).subscribe(data => console.log(data))
            }
        }
        if (this.isRecruiter) {
            console.log(this.userInfoForm)
            console.log(`valid : ${this.userInfoForm.valid}`)
            if (this.userInfoForm.valid) {
                console.log(this.userInfoForm.value)
                const user = this.mapToRecruiter(this.userInfoForm.value, this.companyForm.value, this.addressForm.value)
                this._authService.registerRecruiter(user).subscribe(data => console.log(data))
            }
        }
    }

    toggleRole() {
        this.isRecruiter = !this.isRecruiter
        console.log(this.isRecruiter)
    }

    mapToUser(userInfoForm: DevRegister, devInfoForm: DevInfoForm, addressForm: Address): DevRegister {
        return {
            username: userInfoForm.username || '',
            password: userInfoForm.password || '',
            firstName: userInfoForm.firstName || '',
            lastName: userInfoForm.lastName || '',
            email: userInfoForm.email || '',
            devProfileUpdateForm: devInfoForm,
            addressForm: addressForm
        };
    }

    mapToRecruiter(descriptionInfoForm: RecruiterRegister, companyForm: CompanyForm, addressForm: Address): RecruiterRegister {

        companyForm.addressForm = addressForm;
        return {
            username: descriptionInfoForm.username || '',
            password: descriptionInfoForm.password || '',
            firstName: descriptionInfoForm.firstName || '',
            lastName: descriptionInfoForm.lastName || '',
            email: descriptionInfoForm.email || '',
            companyForm: companyForm,
        };
    }

    nextStep(){
        this.step.update( value => value + 1)
    }

    previousStep(){
        this.step.update(value => value - 1)
    }

    protected readonly signal = signal;
}


