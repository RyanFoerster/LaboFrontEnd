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
import {UserRegister} from "../../../shared/models/UserRegister";
import {Address} from "../../../shared/models/Address";
import {DevInfoForm} from "../../../shared/models/DevInfoForm";

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
        FormsModule
    ],
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

    userInfoForm: FormGroup
    devInfoForm: FormGroup
    recruiterInfoForm!: FormGroup
    addressForm: FormGroup
    technologyBackEnd = Object.values(TechnologyBackEnd)
    technologyFrontEnd = Object.values(TechnologyFrontEnd)
    role!: string
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
    }

    register(): void {
        if(this.userInfoForm.valid){
            console.log(this.userInfoForm.value)
            const user = mapToUser(  this.userInfoForm.value, this.devInfoForm.value, this.addressForm.value)
            this._authService.register(user).subscribe(data => console.log(data))
        }
    }

}

function mapToUser(userInfoForm: UserRegister, devInfoForm: DevInfoForm, addressForm: Address): UserRegister {
    return {
        username: userInfoForm.username || '',
        password: userInfoForm.password || '',
        firstName: userInfoForm.firstName || '',
        lastName: userInfoForm.lastName || '',
        email: userInfoForm.email || '',
        devProfileUpdateForm: devInfoForm,
        addressForm: addressForm
    } ;
}
