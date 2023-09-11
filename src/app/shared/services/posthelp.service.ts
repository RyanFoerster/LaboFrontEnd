import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PostHelp} from "../models/PostHelp";
import {environments} from "../../../environments/environments";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class PosthelpService {



    constructor(private _httpClient: HttpClient) {
    }

    getAll(): Observable<PostHelp[]>{

        return this._httpClient.get<PostHelp[]>(`${environments.apiUrl}/posthelp`)
    }


}
