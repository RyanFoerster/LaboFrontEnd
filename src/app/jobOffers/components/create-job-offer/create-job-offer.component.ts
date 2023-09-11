import { Component } from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {JobOffer} from "../../../shared/models/JobOffer";
import {JobOfferService} from "../../../shared/services/job-offer.service";

@Component({
    selector: 'app-create-job-offer',
    standalone: true,
    templateUrl: './create-job-offer.component.html',
    imports: [
        RouterLink,
        ReactiveFormsModule
    ],
    styleUrls: ['./create-job-offer.component.scss']
})
export class CreateJobOfferComponent {

    newJobOfferForm: FormGroup;
    newJobOffer!: JobOffer;

    constructor(private _FB : FormBuilder,
                private _jobServ : JobOfferService,
                private _router : Router) {
        this.newJobOfferForm = this._FB.group(
            {
                title:[null,[Validators.required]],
                description:[null,[Validators.required]],
                technologyFrontEnds:[null],
                technologyBackEnds:[null],
                link:[null,[Validators.required]]

            }
        )
    }
    createJobOffer() {

    }
}
