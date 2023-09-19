import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environments} from "../../../environments/environments";
import {Relation} from "../models/Relation";

@Injectable({
    providedIn: 'root'
})
export class RelationService {

    constructor(private _httpClient: HttpClient) {
    }

    createRelation(devId: number){
        console.log("service : " + devId)
        return this._httpClient.post<number>(`${environments.apiUrl}/match`, devId)
    }

    getRelation(): Observable<Relation[]>{
        return this._httpClient.get<Relation[]>(`${environments.apiUrl}/match`)
    }

    getRelationById(matchId: number): Observable<Relation>{
        return this._httpClient.get<Relation>(`${environments.apiUrl}/match/${matchId}`)
    }

}
