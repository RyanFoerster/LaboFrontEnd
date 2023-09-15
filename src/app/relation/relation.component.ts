import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTableModule} from "@angular/material/table";
import {User} from "../shared/models/User";
import {DevService} from "../shared/services/dev.service";
import {Observable, tap} from "rxjs";
import {MatButtonModule} from "@angular/material/button";
import {RelationService} from "../shared/services/relation.service";
import {data} from "autoprefixer";

@Component({
    selector: 'app-relation',
    standalone: true,
    imports: [CommonModule, MatTableModule, MatButtonModule],
    templateUrl: './relation.component.html',
    styleUrls: ['./relation.component.scss']
})
export class RelationComponent {

    displayedColumns: string[] = ['id', 'name', 'button'];
    devs$!: Observable<User[]>


    constructor(private _devService: DevService,
                private _relationService: RelationService) {
        this.devs$ = this._devService.getAll()
    }

    onMatch(devId: number){
        this._relationService.createRelation(devId).subscribe()
    }

}
