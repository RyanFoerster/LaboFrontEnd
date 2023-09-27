import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {User} from "../shared/models/User";
import {DevService} from "../shared/services/dev.service";
import {map, Observable} from "rxjs";
import {RelationService} from "../shared/services/relation.service";
import {AuthService} from "../shared/services/auth.service";
import {Relation} from "../shared/models/Relation";

@Component({
    selector: 'app-relation',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './relation.component.html',
    styleUrls: ['./relation.component.scss']
})
export class RelationComponent implements OnInit{

    devs!: User[]
    relation!: Relation[]
    connectedUser: User | undefined


    constructor(private _devService: DevService,
                private _relationService: RelationService,
                private _authService: AuthService) {
    }

    ngOnInit() {
        this.connectedUser = this._authService.user

        this._relationService.getRelation().subscribe(data => this.relation = data)

        this._devService.getAll().subscribe(data => this.devs = data)


    }

    onMatch(devId: number){
        this._relationService.createRelation(devId).subscribe()
    }

    alreadyMatched(dev: User){
        return this.relation.some( r => r.userId == dev.id)
    }

}
