import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PostHelp} from "../models/PostHelp";
import {environments} from "../../../environments/environments";
import {Observable} from "rxjs";
import {VoteSujet} from "../models/VoteSujet";

@Injectable({
    providedIn: 'root'
})
export class PosthelpService {



    constructor(private _httpClient: HttpClient) {
    }

    getAll(): Observable<PostHelp[]>{

        return this._httpClient.get<PostHelp[]>(`${environments.apiUrl}/posthelp`)
    }


    votePost(id: string | undefined, voteType: string): Observable<PostHelp> {
        return this._httpClient.post<PostHelp>(
            `${environments.apiUrl}/posthelp/${id}/vote`,
            null,
            {
                params: { voteType: voteType }
            }
        );
    }


}
