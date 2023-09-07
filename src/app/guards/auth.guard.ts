import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../shared/services/auth.service";
import {Observable, tap} from "rxjs";

export const authGuard: CanActivateFn = (route, state): Observable<boolean> => {

    const _authService: AuthService = inject(AuthService);
    const _router: Router = inject(Router);

    console.log(_authService)

    return _authService.isLogged$.pipe(
        tap( logged => {
            console.log(logged)
            if( !logged )
                _router.navigateByUrl("/login");
        } )
    )
    // if (_authService.token) {
    //     return true; // Autorise l'accès
    // }
    //
    // return false; // Empêche l'accès
};
