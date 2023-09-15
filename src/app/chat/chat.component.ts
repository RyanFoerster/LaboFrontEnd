import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms"
import {Client} from '@stomp/stompjs';
import {User} from "../shared/models/User";
import {AuthService} from "../shared/services/auth.service";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {RelationService} from "../shared/services/relation.service";
import {Observable} from "rxjs";
import {Relation} from "../shared/models/Relation";
import {ReversePipe} from "../shared/pipe/reverse.pipe";
import {Message} from "../shared/models/Message";

@Component({
    selector: 'app-chat',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatInputModule,
        MatButtonModule,
        ReversePipe
    ],
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

    private stompClient!: Client;
    text: Message[] = []
    userConnected!: User | undefined
    messageToSend: string = ""
    relations$!: Observable<Relation[]>


    constructor(private _authService: AuthService,
                private _relationService: RelationService
    ) {}

    ngOnInit() {
        this.stompClient = new Client({
            brokerURL: 'ws://localhost:8080/chat'
        });

        this.userConnected = this._authService.user
        this.relations$ = this._relationService.getRelation()
    }

    connect() {
        this.stompClient.activate();
        this.stompClient.onConnect = (frame) => {
            console.log("connected" + frame)
            this.stompClient.subscribe(`/user/${this.userConnected?.username}/queue/private-reply`, (message) => {
                this.text.push(JSON.parse(message.body))
            });
        };

        this.stompClient.onWebSocketError = (error) => {
            console.error('Error with websocket', error);
        };

        this.stompClient.onStompError = (frame) => {
            console.error('Broker reported error: ' + frame.headers['message']);
            console.error('Additional details: ' + frame.body);
        };
    }

    disconnect() {
        this.stompClient.deactivate();
        console.log("Disconnected");
    }

    sendMessage(message: string, receptorId: number) {
        console.log(receptorId)
        this.stompClient.publish({
            destination: "/app/private-message",
            body: JSON.stringify({
                emitter: this.userConnected?.username,
                receptorId: receptorId,
                message: message
            })
        });

        this.messageToSend = "";
    }

}
