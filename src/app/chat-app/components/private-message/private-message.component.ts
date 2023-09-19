import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
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
export class PrivateMessageComponent implements OnChanges, OnInit{

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
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['chatId'] && this.chatId) {
            this.relation$ = this._relationService.getRelationById(this.chatId)
        }
    }

    connect() {
        this.stompClient.activate();
        this.stompClient.onConnect = (frame) => {
            console.log("connected" + frame)
            this.stompClient.subscribe(`/user/${this.userConnected?.username}/queue/private-reply`, (message) => {

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

    disconnect() {
        this.stompClient.deactivate();
        console.log("Disconnected");
    }

    sendMessage(message: string, receptorId: number) {
        this.stompClient.publish({
            destination: "/app/private-message",
            body: JSON.stringify({
                emitter: this.userConnected?.username,
                receptorId,
                message
            })
        });

        this.messageToSend = "";
    }

}
