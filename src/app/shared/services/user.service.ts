import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {DevInfo} from "../models/devInfo";
import {DevInfoForm} from "../models/DevInfoForm";
import {environments} from "../../../environments/environments";
import {Recruiter} from "../models/Recruiter";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _httpClient: HttpClient) {
  }

  getDevInfoFromServer(id:string):Observable<DevInfo>{
    return this._httpClient.get<DevInfo>(`${environments.apiUrl}/dev/${id}`)
  }

  getRecruiterInfoFromServer(id:string):Observable<Recruiter>{
      return this._httpClient.get<Recruiter>(`${environments.apiUrl}/recruiter/${id}`)
  }
}
