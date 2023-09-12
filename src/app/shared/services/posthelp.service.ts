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


    votePost(id: number, voteType: VoteType): Observable<Vote> {
        return this._httpClient.post<Vote>(
            `${environments.apiUrl}/posthelp/${id}/vote`,
            null,
            {
                params: { voteType: voteType }
            }
        );
    }

    getVote(postId: number){
        return this._httpClient.get<Vote>(`${environments.apiUrl}/posthelp/${postId}/vote`)
    }


}

export interface Vote {voteType: string | null, hasVoted: boolean, score: number}
export type VoteType = 'UPVOTE' | 'DOWNVOTE'
