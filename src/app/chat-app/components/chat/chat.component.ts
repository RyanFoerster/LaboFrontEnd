import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms"
import {Client} from '@stomp/stompjs';
import {User} from "../../../shared/models/User";
import {AuthService} from "../../../shared/services/auth.service";
import {RelationService} from "../../../shared/services/relation.service";
import {Observable, tap} from "rxjs";
import {Relation} from "../../../shared/models/Relation";
import {ReversePipe} from "../../../shared/pipe/reverse.pipe";
import {Message} from "../../../shared/models/Message";

@Component({
    selector: 'app-chat',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReversePipe
    ],
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
    private stompClient!: Client;
    userConnected!: User | undefined
    relations$!: Observable<Relation[]>
    relation$!: Observable<Relation>
    chatId!: number
    messages: Message[] = []
    messageToSend: string = ""



    constructor(private _authService: AuthService,
                private _relationService: RelationService
    ) {}

    ngOnInit() {

        this.userConnected = this._authService.user
        this.relations$ = this._relationService.getRelation()

        this.stompClient = new Client({
            brokerURL: 'ws://localhost:8080/chat'
        });

        this.connect()

        this.stompClient.onConnect = (frame) => {
            console.log("connected" + frame)
            this.stompClient.subscribe(`/user/${this.userConnected?.username}/topic/private-reply`, (message) => {
                this.messages.push(JSON.parse(message.body))
                this.relations$ = this._relationService.getRelation()
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

    ngOnDestroy() {
        this.disconnectWebSocket(); // Appel de la méthode pour déconnecter la WebSocket
    }

    disconnectWebSocket() {
        if (this.stompClient && this.stompClient.connected) {
            this.stompClient.deactivate();
            console.log("WebSocket Disconnected");
        }
    }

    connect() {
        this.stompClient.activate();
    }


    sendChatId(chatId: number){
        this.chatId = chatId
        this.relation$ = this._relationService.getRelationById(this.chatId).pipe(
            tap(data => this.messages = data.messages)
        )
    }

    sendMessage(message: string, matchId: number) {
        this.stompClient.publish({
            destination: "/app/private-message",
            body: JSON.stringify({
                emitter: this.userConnected?.username,
                matchId,
                message
            })
        });

        this.messageToSend = "";
    }

}
