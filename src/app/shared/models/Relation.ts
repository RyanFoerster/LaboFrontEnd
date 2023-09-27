import {Message} from "./Message";

export interface Relation {
    id: number
    userId: number
    name: string
    messages: Message[]
}
