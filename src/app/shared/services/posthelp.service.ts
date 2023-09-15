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

    getComment(commentId: number): Observable<Comment>{
        return this._httpClient.get<Comment>(`${environments.apiUrl}/posthelp/comment/${commentId}`)
    }


    voteHelp(id: number, voteType: VoteType): Observable<Vote> {
        return this._httpClient.post<Vote>(
            `${environments.apiUrl}/posthelp/${id}/vote`,
            null,
            {
                params: { voteType: voteType }
            }
        );
    }
    votePostComment(id: number, voteType: VoteType): Observable<Vote> {
        return this._httpClient.post<Vote>(
            `${environments.apiUrl}/posthelp/comment/${id}/vote`,
            null,
            {
                params: { voteType: voteType }
            }
        );
    }

    getVoteHelp(postId: number){
        return this._httpClient.get<Vote>(`${environments.apiUrl}/posthelp/${postId}/vote`)
    }
    getCommentVote(commentId: number){
        return this._httpClient.get<Vote>(`${environments.apiUrl}/posthelp/comment/${commentId}/vote`)
    }

}

export interface Vote {voteType: string | null, hasVoted: boolean, score: number}
export type VoteType = 'UPVOTE' | 'DOWNVOTE'
