import {Component, OnInit, signal} from '@angular/core';
import {User} from "../shared/models/User";
import {SessionService} from "../shared/services/session.service";
import {NgIf} from "@angular/common";

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

    constructor(private _sessionService: SessionService) {
    }

    ngOnInit() {
        
        if(this._sessionService.getToken()){
            this.user = this._sessionService.getToken()?.userDTO
        }

    }

}
