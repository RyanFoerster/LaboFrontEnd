import {Component} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {CommonModule, NgIf} from "@angular/common";
import {AuthService} from "../../../shared/services/auth.service";
import {User} from "../../../shared/models/User";

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule, RouterLink, NgIf, ],
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent{

    isLogged:boolean = false
    showSpinner: boolean = false
    userConnected!: User | undefined


    constructor(private _authService: AuthService,
                private _router: Router) {
       this._authService.isLogged$.subscribe(data => this.isLogged = data)
        this.userConnected = this._authService.user

    }

    logout() {
        this._authService.logout()
        this._router.navigateByUrl("/login")
    }

}
