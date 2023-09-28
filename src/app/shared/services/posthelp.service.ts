import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PostHelp} from "../models/PostHelp";
import {environments} from "../../../environments/environments";
import {BehaviorSubject, map, Observable} from "rxjs";
import {PostHelpForm} from "../models/PostHelpForm";
import {CommentForm} from "../models/CommentForm";

@Injectable({
    providedIn: 'root'
})
export class PosthelpService {

    constructor(private _httpClient: HttpClient) {
    }

    createPost(post: PostHelpForm): Observable<PostHelpForm> {
        return this._httpClient.post<PostHelpForm>(`${environments.apiUrl}/posthelp`, post);
    }
    createComment(comment: CommentForm, id: number) : Observable<CommentForm> {
        return this._httpClient.post<CommentForm>(`${environments.apiUrl}/posthelp/comment/${id}`, comment)
    }

    getAll(): Observable<PostHelp[]> {
        return this._httpClient.get<PostHelp[]>(`${environments.apiUrl}/posthelp`).pipe(
            map(posts => {
                posts.forEach(post => {
                    post.comments.sort((a, b) => b.score - a.score);
                });
                return posts;
            })
        );
    }

    getComment(commentId: number): Observable<Comment>{
        return this._httpClient.get<Comment>(`${environments.apiUrl}/posthelp/comment/${commentId}`)
    }


    votePostHelp(id: number, voteType: VoteType): Observable<Vote> {
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

    getVotePostHelp(postId: number){
        return this._httpClient.get<Vote>(`${environments.apiUrl}/posthelp/${postId}/vote`)
    }
    getCommentVote(commentId: number){
        return this._httpClient.get<Vote>(`${environments.apiUrl}/posthelp/comment/${commentId}/vote`)
    }



}

export interface Vote {voteType: string | null, hasVoted: boolean, score: number}
export type VoteType = 'UPVOTE' | 'DOWNVOTE'
