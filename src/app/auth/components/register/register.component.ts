import {Component} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {NgForOf, NgIf} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {AuthService} from "../../../shared/services/auth.service";
import {MatStepperModule} from "@angular/material/stepper";
import {MatRadioModule} from "@angular/material/radio";
import {TechnologyBackEnd} from "../../../shared/models/enums/TechnologyBackEnd";
import {TechnologyFrontEnd} from "../../../shared/models/enums/TechnologyFrontEnd";
import {DevRegister} from "../../../shared/models/DevRegister";
import {Address} from "../../../shared/models/Address";
import {DevInfoForm} from "../../../shared/models/DevInfoForm";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {RecruiterRegister} from "../../../shared/models/RecruiterRegister";
import {CompanyForm} from "../../../shared/models/CompanyForm";

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
        MatButtonModule,
        MatStepperModule,
        MatRadioModule,
        FormsModule,
        MatCheckboxModule
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

    constructor(private _formBuilder: FormBuilder,
                private _authService: AuthService) {

        this.userInfoForm = _formBuilder.group({
            username: [null, [Validators.required]],
            password: [null, [Validators.required]],
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
            if (this.userInfoForm.valid) {
                const user = this.mapToRecruiter(this.userInfoForm.value, this.companyForm.value, this.addressForm.value)
                this._authService.registerRecruiter(user).subscribe(data => console.log(data))
            }
        }
    }

    toggleRole() {
        this.isRecruiter = !this.isRecruiter
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
}


