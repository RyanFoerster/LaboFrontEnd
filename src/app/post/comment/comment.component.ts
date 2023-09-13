import {Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {PosthelpService, Vote, VoteType} from "../../shared/services/posthelp.service";
import {Observable, tap} from "rxjs";
import {PostComment} from "../../shared/models/PostComment";
import {VoteComment} from "../../shared/models/VoteComment";

@Component({
  selector: 'app-comment',
  standalone: true,
    imports: [CommonModule, MatButtonModule],
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

    @Input()
    comment!: PostComment;
    voteInfo$!: Observable<Vote>
    constructor(private readonly _posthelpService: PosthelpService) {
    }

    ngOnInit(): void {
        this.voteInfo$ = this._posthelpService.getCommentVote(this.comment.id).pipe(
                tap({
                    next: response => console.log('Upvoted successfully', response),
                    error: error => console.log('Error upvoting', error)
                })
        );
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
