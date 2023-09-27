import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PostHelp} from "../shared/models/PostHelp";
import {PosthelpService, Vote, VoteType} from "../shared/services/posthelp.service";
import {Observable, tap} from "rxjs";
import {AuthService} from "../shared/services/auth.service";
import {User} from "../shared/models/User";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommentComponent} from "./comment/comment.component";
import {TechnologyBackEnd} from "../shared/models/enums/TechnologyBackEnd";
import {TechnologyFrontEnd} from "../shared/models/enums/TechnologyFrontEnd";
import {PostHelpForm} from "../shared/models/PostHelpForm";


@Component({
    selector: 'app-post',
    standalone: true,
    imports: [CommonModule, FormsModule, CommentComponent, ReactiveFormsModule],
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
    @Input('post')
    postHelp!: PostHelp;

    connectedUser?: User;

    vote$!: Observable<Vote>;
    voteComment$!: Observable<Vote>;
    panelOpenState: boolean = false;




    constructor(
        private readonly _posthelpService: PosthelpService,
        private _authService: AuthService,

    ) {



    }

    ngOnInit(): void {
        this.vote$ = this._posthelpService.getVotePostHelp(this.postHelp.id)

        if (this._authService.user) {
            this.connectedUser = this._authService.user;
        } else {
            this.connectedUser = undefined;
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


}
