import {Component, OnInit} from '@angular/core';
import {async, Observable, tap} from "rxjs";
import {JobOffer} from "../../../shared/models/JobOffer";
import {JobOfferService} from "../../../shared/services/job-offer.service";
import {AuthService} from "../../../shared/services/auth.service";
import {User} from "../../../shared/models/User";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {AsyncPipe, NgIf} from "@angular/common";
import {data} from "autoprefixer";

@Component({
    selector: 'app-single-job-offer',
    standalone: true,
    templateUrl: './single-job-offer.component.html',
    imports: [
        NgIf,
        AsyncPipe,
        RouterLink
    ],
    styleUrls: ['./single-job-offer.component.scss']
})
export class SingleJobOfferComponent implements OnInit {

    jobOfferSub$!: Observable<JobOffer>;

    connectedUser!: User | undefined;

    constructor(private _jobServ: JobOfferService,
                private _activeRoute: ActivatedRoute,
                private _authServ: AuthService) {
    }

    ngOnInit(): void {
        this.initObservables();
    }

    private initObservables() {
        if (this._authServ.user) {
            this.connectedUser = this._authServ.user;
        } else {
            this.connectedUser = undefined;
        }

        let jobId = this._activeRoute.snapshot.params['id']

        this.jobOfferSub$ = this._jobServ.getSingleJobOfferFromServer(jobId);
    }

}
