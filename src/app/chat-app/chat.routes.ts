import {Routes} from "@angular/router";

export default [{
    path: "",
    children: [
        {
            path: "chat",
            title: "Chat",
            loadComponent: () => import("./components/chat/chat.component").then(module => module.ChatComponent)
        }
    ]
}] as Routes
