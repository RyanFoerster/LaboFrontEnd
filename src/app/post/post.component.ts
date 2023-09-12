import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {PostHelp} from "../shared/models/PostHelp";
import {PosthelpService, Vote, VoteType} from "../shared/services/posthelp.service";
import {Observable, tap} from "rxjs";

@Component({
  selector: 'app-post',
  standalone: true,
    imports: [CommonModule, MatButtonModule, MatCardModule],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit{
    @Input('post')
    postHelp!: PostHelp;

    vote$!: Observable<Vote>;

    constructor(
        private readonly _posthelpService: PosthelpService
    ) {}

    ngOnInit(): void {
        this.vote$ = this._posthelpService.getVote(this.postHelp.id)
    }

    vote(id: number, type: VoteType){
        this.vote$ = this._posthelpService.votePost(id, type).pipe(
            tap({
                next: response => console.log('Upvoted successfully', response),
                error: error => console.log('Error upvoting', error)
            })
        );
    }

}
