import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms"
import {Client} from '@stomp/stompjs';

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

    private stompClient!: Client;
    text: string[] = []

    constructor() { }

    ngOnInit() {
        this.stompClient = new Client({
            brokerURL: 'ws://localhost:8080/chat'
        });


    }

    connect() {
        this.stompClient.activate();
        this.stompClient.onConnect = (frame) => {
            console.log('Connected: ' + frame);
            this.stompClient.subscribe('/topic/messages', (message) => {
                this.text.push(message.body)
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

    sendName() {
        this.stompClient.publish({
            destination: "/app/message",
            body: JSON.stringify({
                message: "Test",
                receptorId: 2,
                emitterId: 1
            })
        });
    }

    showGreeting(message: string) {

    }

}
