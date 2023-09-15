import {Injectable, Signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/User";
import {environments} from "../../../environments/environments";
import {toSignal} from "@angular/core/rxjs-interop";

@Injectable({
  providedIn: 'root'
})
export class DevService {

  constructor(private _httpClient: HttpClient) { }

    getAll(): Observable<User[]>{
      return this._httpClient.get<User[]>(`${environments.apiUrl}/dev`)
    }
}
