import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PosthelpService, Vote, VoteType} from "../../shared/services/posthelp.service";
import {Observable, tap} from "rxjs";
import {PostComment} from "../../shared/models/PostComment";
import {AuthService} from "../../shared/services/auth.service";
import {User} from "../../shared/models/User";

@Component({
  selector: 'app-comment',
  standalone: true,
    imports: [CommonModule],
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

    @Input()
    comment!: PostComment;
    voteInfo$!: Observable<Vote>
    connectedUser: User | undefined
    constructor(private readonly _posthelpService: PosthelpService,
                private readonly _authService: AuthService) {
    }

    ngOnInit(): void {

        this.connectedUser = this._authService.user

        if(this.connectedUser?.role === 'DEVELOPER'){
            this.voteInfo$ = this._posthelpService.getCommentVote(this.comment.id).pipe(
                tap({
                    next: response => console.log('Upvoted successfully', response),
                    error: error => console.log('Error upvoting', error)
                })
            );
        }

    }



    voteComment(type: VoteType) {
        this.voteInfo$ = this._posthelpService.votePostComment(this.comment.id, type).pipe(
            tap({
                next: response => console.log('Upvoted successfully', response),
                error: error => console.log('Error upvoting', error)
            })
        )
    }

}
