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

    uploadCV(devId: number, file: File): Observable<any> {
        const formData: FormData = new FormData();
        formData.append('file', file);
        return this._httpClient.post(`${environments.apiUrl}/dev/${devId}/upload-cv`, formData);
    }

    downloadCV(devId: number): Observable<Blob> {
        const url = `${environments.apiUrl}/dev/${devId}/download-cv`;

        // Return the response as Blob for file download
        return this._httpClient.get(url, { responseType: 'blob' });
    }


}
