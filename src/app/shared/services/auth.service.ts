import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DevRegister} from "../models/DevRegister";
import {environments} from "../../../environments/environments";
import {BehaviorSubject, map, Observable, tap} from "rxjs";
import {Token} from "../models/Token";
import {User} from "../models/User";
import {RecruiterRegister} from "../models/RecruiterRegister";

@Injectable({
    providedIn: "root"
})
export class AuthService {


    private _token$: BehaviorSubject<Token | null>


    constructor(private _httpClient: HttpClient) {
        const tokenFromSession = localStorage.getItem('token')
        this._token$ = new BehaviorSubject<Token | null>(tokenFromSession ? JSON.parse(tokenFromSession) : null)
        this._token$.subscribe(console.log)
    }

    registerDev(user: DevRegister): Observable<User> {
        return this._httpClient.post<User>(`${environments.apiUrl}/auth/dev-register`, user)
    }

    activeDev(confirmationToken : string): Observable<User> {
        return this._httpClient.patch<User>(`${environments.apiUrl}/dev/${confirmationToken}`, confirmationToken)
    }

    registerRecruiter(user: RecruiterRegister): Observable<User> {
        console.log(user)
        return this._httpClient.post<User>(`${environments.apiUrl}/auth/recruiter-register`, user)
    }

    activeRecruiter(confirmationToken: string): Observable<User> {
        return this._httpClient.patch<User>(`${environments.apiUrl}/recruiter/${confirmationToken}`, confirmationToken)
    }

    login(username: string, password: string): Observable<Token> {
        return this._httpClient.post<Token>(`${environments.apiUrl}/auth/login`, {
            username,
            password
        }).pipe(
            tap(response => this.addToSession(response))
        )
    }


    logout() {
        this.removeFromSession()
    }

    private addToSession(token: Token) {
        localStorage.setItem('token', JSON.stringify(token))

        this._token$.next(token)
    }

    private removeFromSession() {
        localStorage.removeItem('token')

        this._token$.next(null)
    }

    get token(): Token | null {
        return this._token$.getValue()
    }

    get token$(): Observable<Token | null> {
        return this._token$.asObservable()
    }

    get user() {
        return this.token?.userDTO;
    }

    get user$(): Observable<User | undefined> {
        return this._token$.pipe(
            map(token => token?.userDTO)
        )
    }

    get isLogged$() {
        return this._token$.pipe(
            map(token => !!token)
        )
    }
}
