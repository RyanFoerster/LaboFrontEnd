import {Component, HostListener, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Relation} from "../../../shared/models/Relation";
import {RelationService} from "../../../shared/services/relation.service";
import {Observable, tap} from "rxjs";
import {User} from "../../../shared/models/User";
import {AuthService} from "../../../shared/services/auth.service";
import {Client} from "@stomp/stompjs";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {Message} from "../../../shared/models/Message";

@Component({
  selector: 'app-private-message',
  standalone: true,
    imports: [CommonModule, FormsModule, MatInputModule, MatButtonModule],
  templateUrl: './private-message.component.html',
  styleUrls: ['./private-message.component.scss']
})
export class PrivateMessageComponent implements OnChanges, OnInit, OnDestroy{

    private stompClient!: Client;
    @Input() chatId!: number
    relation$!: Observable<Relation>
    userConnected: User | undefined
    messageToSend: string = ""
    messages: Message[] = []



    constructor(private _relationService: RelationService,
                private _authService: AuthService) {

        this.userConnected = this._authService.user
    }

    ngOnInit() {
        this.stompClient = new Client({
            brokerURL: 'ws://localhost:8080/chat'
        });

        this.connect()

        this.stompClient.onConnect = (frame) => {
            console.log("connected" + frame)
            this.stompClient.subscribe(`/user/${this.userConnected?.username}/topic/private-reply`, (message) => {
                this.messages.push(JSON.parse(message.body))
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

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['chatId'] && this.chatId) {
            this.relation$ = this._relationService.getRelationById(this.chatId).pipe(
                tap(data => this.messages = data.messages)
            )
        }
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
