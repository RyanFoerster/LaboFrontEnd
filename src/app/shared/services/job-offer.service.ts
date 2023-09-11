import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {environments} from "../../../environments/environments";
import {JobOfferIndex} from "../models/JobOfferIndex";

@Injectable({
  providedIn: 'root'
})
export class JobOfferService {

  constructor(private _http : HttpClient) { }

    private _jobOffers$ = new BehaviorSubject<JobOfferIndex[]>([]);

  get jobOffers$(): Observable<JobOfferIndex[]>{
      return this._jobOffers$.asObservable();
  }

  getJobOffersFromServer():Observable<JobOfferIndex>{
      return this._http.get<JobOfferIndex>(`${environments.apiUrl}/job/jobs`)
  }
}
