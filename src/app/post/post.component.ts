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
import {CommentForm} from "../shared/models/CommentForm";


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
    isShowCommentary: boolean = false
    commentForm! : FormGroup;


    constructor(
        private readonly _posthelpService: PosthelpService,
        private _authService: AuthService,
        private _formBuilder: FormBuilder
    ) {

    }

    ngOnInit(): void {

        this.commentForm = this._formBuilder.group({
            message: [null, [Validators.required]]
        });

        if (this._authService.user) {
            this.connectedUser = this._authService.user;
        } else {
            this.connectedUser = undefined;
        }

        if (this.postHelp.comments) {
            this.postHelp.comments.sort((a, b) => b.score - a.score); // Tri des commentaires par score
        }

        if(this.connectedUser?.role === 'DEVELOPER'){
            this.vote$ = this._posthelpService.getVotePostHelp(this.postHelp.id)
        }

    }

    vote(id: number, type: VoteType) {
        this.vote$ = this._posthelpService.votePostHelp(id, type).pipe(
            tap({
                next: response => {
                    console.log('Voted successfully', response);

                    // Mettre à jour le score du post
                    this.postHelp.score = response.score;

                    // Si vous avez besoin de trier les commentaires après avoir voté sur le post
                    this.postHelp.comments.sort((a, b) => b.score - a.score);
                },
                error: error => console.log('Error voting', error)
            })
        );
    }

    addComment(): void{
        if(this.connectedUser?.role === 'DEVELOPER'){
            if(this.commentForm.valid){
                let newComment: CommentForm = this.commentForm.value;
                this._posthelpService.createComment(newComment, this.postHelp.id).subscribe({
                    next : response => {
                        console.log("Comment created with success", response);
                        if (this.postHelp.comments) {
                            this.postHelp.comments.sort((a, b) => b.score - a.score); // Tri des commentaires par score
                        }
                    },
                    error: error => {
                        console.error("Error with the comment:", error);
                    }
                })
            }
        }
    }

    showCommentaire() {
        this.isShowCommentary = !this.isShowCommentary
    }
}
