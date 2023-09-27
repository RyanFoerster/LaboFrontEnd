import {CanActivateFn} from '@angular/router';
import {AuthService} from "../shared/services/auth.service";
import {inject} from "@angular/core";
import {User} from "../shared/models/User";

export const recruiterGuard: CanActivateFn = (route, state) => {

    const authService: AuthService = inject(AuthService)
    const connectedUser: User | undefined = authService.user


    return connectedUser?.role === 'RECRUITER';
};
