import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {environments} from "../../../environments/environments";
import {JobOfferIndex} from "../models/JobOfferIndex";
import {JobOffer} from "../models/JobOffer";
import {JobOfferToAdd} from "../models/JobOfferToAdd";

@Injectable({
    providedIn: 'root'
})
export class JobOfferService {

    constructor(private _http: HttpClient) {
    }

    private _jobOffers$ = new BehaviorSubject<JobOfferIndex[]>([]);

    get jobOffers$(): Observable<JobOfferIndex[]> {
        return this._jobOffers$.asObservable();
    }

    getJobOffersFromServer(): Observable<JobOfferIndex> {
        return this._http.get<JobOfferIndex>(`${environments.apiUrl}/job`)
    }

    getSingleJobOfferFromServer(id: string): Observable<JobOffer> {
        return this._http.get<JobOffer>(`${environments.apiUrl}/job/${id}`)
    }

    deleteJobFromServer(id: string): Observable<string> {
        return this._http.delete<string>(`${environments.apiUrl}/job/${id}`)
    }

    addJobToServer(newJobOffer : JobOffer):Observable<JobOfferToAdd>{
        return this._http.post<JobOfferToAdd>(`${environments.apiUrl}/job`,newJobOffer)
    }

    updateJob(jobOfferToEdit: JobOffer, id: string):Observable<JobOfferToAdd> {
        return this._http.put<JobOfferToAdd>(`${environments.apiUrl}/job/${id}`,jobOfferToEdit)
    }
}
