import {Component} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {CommonModule, NgIf} from "@angular/common";
import {AuthService} from "../../../shared/services/auth.service";
import {Observable} from "rxjs";

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule, RouterLink, NgIf, ],
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
