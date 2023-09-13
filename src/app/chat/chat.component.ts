import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms"
import { Client } from '@stomp/stompjs';

import { WebSocket } from 'ws';
import {Message} from "../shared/models/Message";
import {AuthService} from "../shared/services/auth.service";
import {User} from "../shared/models/User";
@Component({
    selector: 'app-chat',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule
    ],
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit{

    private urlWS = "ws://localhost:8080/chat";
    private client: Client = new Client({
        brokerURL: this.urlWS
    });
    emitter!: User | undefined
    connected: boolean = false
    messages: string[] = []


    constructor(private _authService: AuthService) {
    }

    ngOnInit() {
        this.client.onConnect = (frame) => {
            this.toggleConnected()
            console.log('Connected: ' + frame);
            this.client.subscribe('/topic/messages', (greeting) => {
                this.addMessage(JSON.parse(greeting.body).content);
            });
        };

        this.client.onWebSocketError = (error) => {
            console.error('Error with websocket', error);
        };

        this.client.onStompError = (frame) => {
            console.error('Broker reported error: ' + frame.headers['message']);
            console.error('Additional details: ' + frame.body);
        };
    }

    addMessage(message: string){
        this.messages.push(message)
    }

    connect(){
        this.client.activate()
        console.log("Connected")
    }

    disconnect(){
        this.client.deactivate()
        console.log("disconnected")
        this.toggleConnected()
    }
    toggleConnected(){
        this.connected = !this.connected
    }
    sendMessages() {
        console.log('Send public messages');


        this.client.publish({
            destination: "/app/message",
            body: JSON.stringify("message"),
        });
    }

}
