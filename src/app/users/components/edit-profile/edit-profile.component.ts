import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../shared/services/user.service";
import {TechnologyBackEnd} from "../../../shared/models/enums/TechnologyBackEnd";
import {TechnologyFrontEnd} from "../../../shared/models/enums/TechnologyFrontEnd";

@Component({
    selector: 'app-edit-profile',
    templateUrl: './edit-profile.component.html',
    standalone: true,
    styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent {
    userInfoForm: FormGroup
    devInfoForm: FormGroup
    companyForm: FormGroup
    addressForm: FormGroup
    technologyBackEnd = Object.values(TechnologyBackEnd)
    technologyFrontEnd = Object.values(TechnologyFrontEnd)
    isRecruiter: boolean = false

    constructor(private _FB: FormBuilder,
                private _userServ: UserService) {

        this.userInfoForm = _FB.group({
            username: [null, [
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(20)
            ]],
            firstName: [null, [Validators.required]],
            lastName: [null, [Validators.required]],
            email: [null, [Validators.required, Validators.email]]
        })

        this.devInfoForm = _FB.group({
            description: ["", []],
            birthDate: [null, []],
            technologyBackEnds: [null, []],
            technologyFrontEnds: [null, []],
            gitHub: ["", []],
            cv: ["",[]],
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

}
