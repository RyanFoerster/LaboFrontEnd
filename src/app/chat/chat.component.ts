import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms"
import {Client} from '@stomp/stompjs';
import {User} from "../shared/models/User";
import {AuthService} from "../shared/services/auth.service";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";

@Component({
    selector: 'app-chat',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatInputModule,
        MatButtonModule
    ],
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit{

    private stompClient!: Client;
    text: string[] = []
    userConnected!: User | undefined
    messageToSend: string = ""
    sessionId: string = ""
    constructor(private _authService: AuthService) { }

    ngOnInit() {
        this.stompClient = new Client({
            brokerURL: 'ws://localhost:8080/hello'
        });

        this.userConnected = this._authService.user
    }

    connect() {
        this.stompClient.activate();
        this.stompClient.onConnect = (frame) => {
            console.log("connected" + frame)
            this.stompClient.subscribe(`/user/${this.userConnected?.username}/queue/private-reply`, (message) => {
                this.text.push(message.body)
                console.log(this.text.length)
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

    sendMessage(message: string) {
        this.stompClient.publish({
            destination: "/app/private-message",
            body: JSON.stringify({
                emitter: this.userConnected?.username,
                receptor: "string2",
                message: message
            })
        });

        this.messageToSend = "";
    }

}
