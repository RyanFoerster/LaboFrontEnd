import {User} from "./User";

export interface Message {
    id?: number
    message: string
    emitter?: User
    receptor?: User
    match?: any
}
