import {Component, OnInit} from '@angular/core';
import {DevRegister} from "../shared/models/DevRegister";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {AuthService} from "../shared/services/auth.service";
import {User} from "../shared/models/User";
import {PostHelp} from "../shared/models/PostHelp";
import {PosthelpService} from "../shared/services/posthelp.service";
import {Observable} from "rxjs";
import {MatCardModule} from "@angular/material/card";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    imports: [
        NgIf,
        AsyncPipe,
        MatCardModule,
        NgForOf
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

}
