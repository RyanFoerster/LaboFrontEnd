import {Message} from "./Message";

export interface Relation {
    id: number
    name: string
    messages: Message[]
}
