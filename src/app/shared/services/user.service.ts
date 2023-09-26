import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {DevInfo} from "../models/DevInfo";
import {environments} from "../../../environments/environments";
import {Recruiter} from "../models/Recruiter";
import {PasswordForm} from "../models/PasswordForm";
import {DevInfoForm} from "../models/DevInfoForm";
import {Address} from "../models/Address";
import {Company} from "../models/Company";
import {CompanyForm} from "../models/CompanyForm";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private _httpClient: HttpClient) {
    }

    getDevInfoFromServer(id: number): Observable<DevInfo> {
        return this._httpClient.get<DevInfo>(`${environments.apiUrl}/dev/${id}`)
    }

    getRecruiterInfoFromServer(id: number): Observable<Recruiter> {
        return this._httpClient.get<Recruiter>(`${environments.apiUrl}/recruiter/${id}`)
    }

    updateDevPassword(newPassword: PasswordForm): Observable<PasswordForm> {
        return this._httpClient.patch<PasswordForm>(`${environments.apiUrl}/dev`, newPassword)
    }

    updateDev(updatedDev: DevInfoForm): Observable<DevInfoForm> {
        console.log(updatedDev)
        return this._httpClient.put<DevInfoForm>(`${environments.apiUrl}/dev`, updatedDev)
    }

    updateDevAddress(updatedAddress: Address):Observable<Address>{
        return this._httpClient.put<Address>(`${environments.apiUrl}/dev/address`,updatedAddress)
    }
    updateRecPassword(newPassword: PasswordForm): Observable<PasswordForm> {
        return this._httpClient.patch<PasswordForm>(`${environments.apiUrl}/recruiter`, newPassword)
    }
    updateRec(updatedRec : Recruiter):Observable<Recruiter> {
        return this._httpClient.put<Recruiter>(`${environments.apiUrl}/recruiter`,updatedRec)
    }

    updateCompany(updatedCompany : Company):Observable<CompanyForm> {
        return this._httpClient.put<CompanyForm>(`${environments.apiUrl}/recruiter/company`,updatedCompany)
    }

    updateCompanyAddress(updatedAddress : Address):Observable<Address> {
        return this._httpClient.put<Address>(`${environments.apiUrl}/recruiter/company/address`,updatedAddress)
    }
}
