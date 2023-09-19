import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms"
import {Client} from '@stomp/stompjs';
import {User} from "../../../shared/models/User";
import {AuthService} from "../../../shared/services/auth.service";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {RelationService} from "../../../shared/services/relation.service";
import {Observable} from "rxjs";
import {Relation} from "../../../shared/models/Relation";
import {ReversePipe} from "../../../shared/pipe/reverse.pipe";
import {Message} from "../../../shared/models/Message";
import {MatCardModule} from "@angular/material/card";
import {PrivateMessageComponent} from "../private-message/private-message.component";

@Component({
    selector: 'app-chat',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatInputModule,
        MatButtonModule,
        ReversePipe,
        MatCardModule,
        PrivateMessageComponent
    ],
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

    userConnected!: User | undefined
    relations$!: Observable<Relation[]>
    chatId!: number


    constructor(private _authService: AuthService,
                private _relationService: RelationService
    ) {}

    ngOnInit() {

        this.userConnected = this._authService.user
        this.relations$ = this._relationService.getRelation()
    }


    sendChatId(chatId: number){
        this.chatId = chatId
    }

}
