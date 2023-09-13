import {Component} from '@angular/core';
import {AuthService} from "../../../shared/services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {tap} from "rxjs";

@Component({
    selector: 'app-recruiter-active-account',
    templateUrl: './recruiter-active-account.component.html',
    standalone: true,
    styleUrls: ['./recruiter-active-account.component.scss']
})
export class RecruiterActiveAccountComponent {
    confirmationToken: string;

    constructor(private _authServ: AuthService,
                private _router: Router,
                private _activeRoute: ActivatedRoute) {
        this.confirmationToken = _activeRoute.snapshot.params['confirmationToken']
    }

    activate() {
        this._authServ.activeRecruiter(this.confirmationToken).pipe(
            tap(() => this._router.navigateByUrl('/home'))
        ).subscribe();
    }
}
