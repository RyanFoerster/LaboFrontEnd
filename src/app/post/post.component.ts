import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PostHelp} from "../shared/models/PostHelp";
import {PosthelpService, Vote, VoteType} from "../shared/services/posthelp.service";
import {Observable, tap} from "rxjs";
import {AuthService} from "../shared/services/auth.service";
import {User} from "../shared/models/User";
import {FormsModule} from "@angular/forms";
import {CommentComponent} from "./comment/comment.component";

@Component({
    selector: 'app-post',
    standalone: true,
    imports: [CommonModule, FormsModule, CommentComponent],
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
    @Input('post')
    postHelp!: PostHelp;

    connectedUser?: User;

    vote$!: Observable<Vote>;

    isShowCommentary: boolean = false


    constructor(
        private readonly _posthelpService: PosthelpService,
        private _authService: AuthService
    ) {
    }

    ngOnInit(): void {


        if (this._authService.user) {
            this.connectedUser = this._authService.user;
        } else {
            this.connectedUser = undefined;
        }

        if(this.connectedUser?.role === 'DEVELOPER'){
            this.vote$ = this._posthelpService.getVotePostHelp(this.postHelp.id)
        }

    }

    vote(id: number, type: VoteType) {

        this.vote$ = this._posthelpService.votePostHelp(id, type).pipe(
            tap({
                next: response => console.log('Upvoted successfully', response),
                error: error => console.log('Error upvoting', error)
            })
        );
    }


    showCommentaire() {
        this.isShowCommentary = !this.isShowCommentary
    }
}
