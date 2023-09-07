import {Component} from '@angular/core';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {Router, RouterLink} from "@angular/router";
import {CommonModule, NgIf} from "@angular/common";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {AuthService} from "../../../shared/services/auth.service";
import {Observable} from "rxjs";

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule, MatSlideToggleModule, MatToolbarModule, MatButtonModule, MatIconModule, RouterLink, NgIf, MatProgressSpinnerModule],
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

    isLogged$: Observable<boolean>
    showSpinner: boolean = false


    constructor(private _authService: AuthService,
                private _router: Router) {
        this.isLogged$ = this._authService.isLogged$
    }

    ngOnInit(): void {
    }

    logout() {
        this._authService.logout()
        this._router.navigateByUrl("/login")
    }

}
