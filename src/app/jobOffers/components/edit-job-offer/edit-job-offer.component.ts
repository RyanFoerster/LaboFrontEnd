import {Component, OnInit} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {JobOffer} from "../../../shared/models/JobOffer";
import {JobOfferService} from "../../../shared/services/job-offer.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {Observable, tap} from "rxjs";
import {TechnologyBackEnd} from "../../../shared/models/enums/TechnologyBackEnd";
import {TechnologyFrontEnd} from "../../../shared/models/enums/TechnologyFrontEnd";

@Component({
    selector: 'app-edit-job-offer',
    standalone: true,
    templateUrl: './edit-job-offer.component.html',
    imports: [
        NgIf,
        ReactiveFormsModule,
        RouterLink,
        NgForOf,
        AsyncPipe
    ],
    styleUrls: ['./edit-job-offer.component.scss']
})
export class EditJobOfferComponent implements OnInit {

    jobOfferForm: FormGroup;
    jobOfferToEdit!: JobOffer;
    jobOfferSub!: Observable<JobOffer>;
    jobId !: string;
    technologiesBackEnd: string[] = Object.values(TechnologyBackEnd);
    technologiesFrontEnd: string[] = Object.values(TechnologyFrontEnd);
    frontTechnologiesInDB!: String[];
    backTechnologiesInDB!: String[];

    constructor(private _FB: FormBuilder,
                private _jobServ: JobOfferService,
                private _router: Router,
                private _activeRoute: ActivatedRoute) {
        this.jobOfferForm = this._FB.group(
            {
                title: [""],
                description: [""],
                technologyFrontEnds: this._FB.array([]),
                technologyBackEnds: this._FB.array([]),
                link: [""]

            }
        )

    }

    ngOnInit(): void {
        this.jobId = this._activeRoute.snapshot.params['id'];
        this.jobOfferSub = this._jobServ.getSingleJobOfferFromServer(this.jobId);
        this.jobOfferSub.subscribe((data) => {
            this.jobOfferForm.patchValue(data);
            this.frontTechnologiesInDB = data.technologyFrontEnds;
            this.backTechnologiesInDB = data.technologyBackEnds;
            this.jobOfferForm.setControl('technologyBackEnds', this._FB.array(data.technologyBackEnds));
            this.jobOfferForm.setControl('technologyFrontEnds', this._FB.array(data.technologyFrontEnds));
        })
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
        this._jobServ.updateJob(this.jobOfferToEdit, this.jobId).pipe(
            tap(() => this._router.navigateByUrl('/job-offers'))
        ).subscribe();
    }

    isFrontTechnologyInDB(tech: String): boolean {
        return this.frontTechnologiesInDB ? this.frontTechnologiesInDB.includes(tech) : false;
    }

    isBackTechnologyInDB(tech: String): boolean {
        return this.backTechnologiesInDB ? this.backTechnologiesInDB.includes(tech) : false;
    }
}
