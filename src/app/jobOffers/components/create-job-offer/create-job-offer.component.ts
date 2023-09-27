import {Component} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {JobOffer} from "../../../shared/models/JobOffer";
import {JobOfferService} from "../../../shared/services/job-offer.service";
import {NgForOf, NgIf} from "@angular/common";
import {min, tap} from "rxjs";
import {TechnologyFrontEnd} from "../../../shared/models/enums/TechnologyFrontEnd";
import {TechnologyBackEnd} from "../../../shared/models/enums/TechnologyBackEnd";

@Component({
    selector: 'app-create-job-offer',
    standalone: true,
    templateUrl: './create-job-offer.component.html',
    imports: [
        RouterLink,
        ReactiveFormsModule,
        NgIf,
        NgForOf
    ],
    styleUrls: ['./create-job-offer.component.scss']
})
export class CreateJobOfferComponent {

    newJobOfferForm: FormGroup;
    newJobOffer!: JobOffer;
    technologiesBackEnd: string[] = Object.values(TechnologyBackEnd);
    technologiesFrontEnd: string[] = Object.values(TechnologyFrontEnd);

    constructor(private _FB: FormBuilder,
                private _jobServ: JobOfferService,
                private _router: Router) {
        this.newJobOfferForm = this._FB.group(
            {
                title: [null, [Validators.required]],
                description: [null, [Validators.required]],
                technologyFrontEnds: this._FB.array([], [Validators.required]),
                technologyBackEnds: this._FB.array([], [Validators.required]),
                link: [null, [Validators.required]]

            }
        )
    }

    get technologyFrontEndsFormArray(): FormArray {
        return this.newJobOfferForm.get('technologyFrontEnds') as FormArray;
    }

    get technologyBackEndsFormArray(): FormArray {
        return this.newJobOfferForm.get('technologyBackEnds') as FormArray;
    }

    updateTechnologyFrontEnds(event: any) {
        const value = event.target.value;
        if (event.target.checked) {
            this.technologyFrontEndsFormArray.push(this._FB.control(value));
        } else {
            const index = this.technologyFrontEndsFormArray.value.indexOf(value);
            if (index >= 0) {
                this.technologyFrontEndsFormArray.removeAt(index);
            }
        }
    }

    updateTechnologyBackEnds(event: any) {
        const value = event.target.value;
        if (event.target.checked) {
            this.technologyBackEndsFormArray.push(this._FB.control(value));
        } else {
            const index = this.technologyBackEndsFormArray.value.indexOf(value);
            if (index >= 0) {
                this.technologyBackEndsFormArray.removeAt(index);
            }
        }
    }

    createJobOffer() {
        if (this.newJobOfferForm.valid) {
            this.newJobOffer = this.newJobOfferForm.value;
            this._jobServ.addJobToServer(this.newJobOffer).pipe(
                tap(()=> this._router.navigateByUrl('/job-offers'))
            ).subscribe();
        }
    }
}
