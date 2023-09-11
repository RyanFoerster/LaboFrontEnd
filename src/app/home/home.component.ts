import {Component, OnInit} from '@angular/core';
import {DevRegister} from "../shared/models/DevRegister";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {AuthService} from "../shared/services/auth.service";
import {User} from "../shared/models/User";

import {PostHelp} from "../shared/models/PostHelp";
import {PosthelpService} from "../shared/services/posthelp.service";
import {Observable} from "rxjs";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";


@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    imports: [
        NgIf,
        AsyncPipe,
        MatCardModule,
        NgForOf,
        MatButtonModule
    ],
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

    user?: User
    postsHelp$!: Observable<PostHelp[]>


    constructor(private _authService: AuthService,
                private _posthelpService: PosthelpService) {
    }

    ngOnInit() {

        if(this._authService.token){
            this.user = this._authService.user
        }

        this.postsHelp$ = this._posthelpService.getAll()

    }

    upvote(id: string | undefined) {
        this._posthelpService.votePost(id, 'UPVOTE').subscribe(
            response => {
                console.log('Upvoted successfully', response);


            },
            error => {
                console.log('Error upvoting', error);
            }
        );
    }

    downvote(id: string | undefined) {
        this._posthelpService.votePost(id, 'DOWNVOTE').subscribe(
            response => {
                console.log('Downvoted successfully', response);

            },
            error => {
                console.log('Error downvoting', error);
            }
        );
    }



}
