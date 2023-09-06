import {Injectable, Signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../models/User";
import {environments} from "../../../environments/environments";
import {Observable, tap} from "rxjs";
import {Token} from "../models/Token";

@Injectable()
export class AuthService {

    private _token: string | undefined = ""

    constructor(private _httpClient: HttpClient) {
    }

    register(user:User): Observable<User>{
        return this._httpClient.post<User>(`${environments.apiUrl}/auth/dev-register`, user)
    }

    login(username: string, password: string): Observable<Token>{
        return this._httpClient.post<Token>(`${environments.apiUrl}/auth/login`, {
            username,
            password
        }).pipe(
            tap(response => this._token = response.token)
        )
    }

    get token(){
        return this._token;
    }
}
