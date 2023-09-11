import {Component, OnInit} from '@angular/core';
import {async, Observable, tap} from "rxjs";
import {JobOffer} from "../../../shared/models/JobOffer";
import {User} from "../../../shared/models/User";
import {JobOfferService} from "../../../shared/services/job-offer.service";
import {AuthService} from "../../../shared/services/auth.service";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {JobOfferIndex} from "../../../shared/models/JobOfferIndex";

@Component({
    selector: 'app-job-offer-list',
    standalone: true,
    templateUrl: './job-offer-list.component.html',
    imports: [
        NgIf,
        AsyncPipe,
        NgForOf
    ],
    styleUrls: ['./job-offer-list.component.scss']
})
export class JobOfferListComponent implements OnInit {

    jobOffersList$!: Observable<JobOfferIndex>;
    jobOffers: JobOffer[]|null = [];
    spinner: boolean = false;

    connectedUser ?: User;

    constructor(private _jobsService: JobOfferService,
                private _autService: AuthService) {
        if (this._autService.user) {
            this.connectedUser = this._autService.user;
        } else {
            this.connectedUser = undefined;
        }

    }

    ngOnInit(): void {

        this.initObservables();
    }

    private initObservables() {
        this.jobOffersList$=this._jobsService.getJobOffersFromServer()
            .pipe(
            tap( data=> {
                this.jobOffers=data.result
                console.log(data.result)
            })
        )
    }

}
