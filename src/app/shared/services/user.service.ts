import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {DevInfo} from "../models/DevInfo";
import {environments} from "../../../environments/environments";
import {Recruiter} from "../models/Recruiter";
import {PasswordForm} from "../models/PasswordForm";
import {DevInfoForm} from "../models/DevInfoForm";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private _httpClient: HttpClient) {
    }

    getDevInfoFromServer(id: string): Observable<DevInfo> {
        return this._httpClient.get<DevInfo>(`${environments.apiUrl}/dev/${id}`)
    }

    getRecruiterInfoFromServer(id: string): Observable<Recruiter> {
        return this._httpClient.get<Recruiter>(`${environments.apiUrl}/recruiter/${id}`)
    }

    updateDevPassword(newPassword: PasswordForm): Observable<PasswordForm> {
        return this._httpClient.patch<PasswordForm>(`${environments.apiUrl}/dev`, newPassword)
    }

    updateDev(updatedDev: DevInfoForm):Observable<DevInfoForm>{
        return this._httpClient.put<DevInfoForm>(`${environments.apiUrl}/dev`,updatedDev)
    }

    updateRecPassword(newPassword: PasswordForm): Observable<PasswordForm> {
        return this._httpClient.patch<PasswordForm>(`${environments.apiUrl}/recruiter`, newPassword)
    }
}
