import {Component, OnInit} from '@angular/core';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {Router, RouterLink} from "@angular/router";
import {CommonModule, NgIf} from "@angular/common";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {AuthService} from "../../../shared/services/auth.service";
import {Observable} from "rxjs";
import {User} from "../../../shared/models/User";

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule, MatSlideToggleModule, MatToolbarModule, MatButtonModule, MatIconModule, RouterLink, NgIf, MatProgressSpinnerModule],
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

    isLogged$: Observable<boolean>
    showSpinner: boolean = false
    connectedUser?:User;


    constructor(private _authService: AuthService,
                private _router: Router) {
        this.isLogged$ = this._authService.isLogged$
    }

    ngOnInit(): void {
        if (this._authService.user) {
            this.connectedUser = this._authService.user;
        } else {
            this.connectedUser = undefined;
        }

    }

    logout() {
        this._authService.logout()
        this._router.navigateByUrl("/login")
    }

}
