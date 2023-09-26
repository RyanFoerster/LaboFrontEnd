import {Component} from '@angular/core';
import {AuthService} from "../../../shared/services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {tap} from "rxjs";

@Component({
    selector: 'app-active-account',
    templateUrl: './dev-active-account.component.html',
    standalone: true,
    styleUrls: ['./dev-active-account.component.scss']
})
export class DevActiveAccountComponent {
    confirmationToken: string;

    constructor(private _authServ: AuthService,
                private _router: Router,
                private _activeRoute: ActivatedRoute) {
        this.confirmationToken = _activeRoute.snapshot.params['confirmationToken']
    }

    activate() {
        this._authServ.activeDev(this.confirmationToken).pipe(
            tap(() => this._router.navigateByUrl('/home'))
        ).subscribe();
    }

}
