import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../shared/services/auth.service";
import {User} from "../../../shared/models/User";
import {AsyncPipe, NgIf} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {DevInfo} from "../../../shared/models/devInfo";
import {Observable} from "rxjs";
import {UserService} from "../../../shared/services/user.service";
import {Recruiter} from "../../../shared/models/Recruiter";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    standalone: true,
    imports: [
        NgIf,
        ReactiveFormsModule,
        AsyncPipe
    ],
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    connectedUser ?: User;
    devInfoSub!: Observable<DevInfo>;
    recruiterSub!: Observable<Recruiter>;

    constructor(private _authService: AuthService,
                private _userService: UserService) {

    }

    ngOnInit(): void {
        this.connectedUser = this._authService.user

        if (this.connectedUser && this.connectedUser?.roles.includes("DEVELOPER"))
            this.devInfoSub = this._userService.getDevInfoFromServer(this.connectedUser?.id)

        if (this.connectedUser && this.connectedUser.roles.includes("RECRUITER"))
            this.recruiterSub = this._userService.getRecruiterInfoFromServer(this.connectedUser.id)
    }


}
