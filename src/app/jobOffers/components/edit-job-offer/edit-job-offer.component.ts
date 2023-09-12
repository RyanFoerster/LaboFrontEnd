import {Component, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {JobOffer} from "../../../shared/models/JobOffer";
import {JobOfferService} from "../../../shared/services/job-offer.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {tap} from "rxjs";

@Component({
    selector: 'app-edit-job-offer',
    standalone: true,
    templateUrl: './edit-job-offer.component.html',
    imports: [
        NgIf,
        ReactiveFormsModule,
        RouterLink
    ],
    styleUrls: ['./edit-job-offer.component.scss']
})
export class EditJobOfferComponent implements OnInit{

    jobOfferForm: FormGroup;
    jobOfferToEdit!: JobOffer;
    jobId !: string;

    constructor(private _FB : FormBuilder,
                private _jobServ: JobOfferService,
                private _router: Router,
                private _activeRoute: ActivatedRoute) {
        this.jobOfferForm = this._FB.group(
            {
                title: [""],
                description: [""],
                technologyFrontEnds: this._FB.array([] ),
                technologyBackEnds: this._FB.array([] ),
                link: [""]

            }
        )
    }

    ngOnInit(): void {
       this.jobId = this._activeRoute.snapshot.params['id']
    }

    get technologyFrontEndsFormArray(): FormArray {
        return this.jobOfferForm.get('technologyFrontEnds') as FormArray;
    }

    get technologyBackEndsFormArray(): FormArray {
        return this.jobOfferForm.get('technologyBackEnds') as FormArray;
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

    editJobOffer() {
        this.jobOfferToEdit = this.jobOfferForm.value;
        this._jobServ.updateJob(this.jobOfferToEdit,this.jobId).pipe(
            tap(()=> this._router.navigateByUrl('/job-offers'))
        ).subscribe();
    }
}
