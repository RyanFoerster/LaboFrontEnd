import {Component, OnInit} from '@angular/core';
import {UserRegister} from "../shared/models/UserRegister";
import {NgIf} from "@angular/common";
import {AuthService} from "../shared/services/auth.service";
import {User} from "../shared/models/User";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    imports: [
        NgIf
    ],
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
    user?: User

    constructor(private _authService: AuthService) {
    }

    ngOnInit() {

        if(this._authService.token){
            this.user = this._authService.user
        }

    }

}
