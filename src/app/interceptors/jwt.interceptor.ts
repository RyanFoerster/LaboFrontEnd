import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from "../shared/services/auth.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private readonly _authService: AuthService) {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        if (this._authService.token) {
            let headers = new HttpHeaders()
            const token = this._authService.token?.token
            headers = headers.append('Authorization', `Bearer ${token}`)
            const newRequest = request.clone({headers: headers})
            return next.handle(newRequest)
        }

        return next.handle(request);
    }
}
