import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {User} from "../shared/models/User";
import {DevService} from "../shared/services/dev.service";
import {Observable} from "rxjs";
import {RelationService} from "../shared/services/relation.service";

@Component({
    selector: 'app-relation',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './relation.component.html',
    styleUrls: ['./relation.component.scss']
})
export class RelationComponent {

    devs$!: Observable<User[]>


    constructor(private _devService: DevService,
                private _relationService: RelationService) {
        this.devs$ = this._devService.getAll()
    }

    onMatch(devId: number){
        this._relationService.createRelation(devId).subscribe()
    }

}
