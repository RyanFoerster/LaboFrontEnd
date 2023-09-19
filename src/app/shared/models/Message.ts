import {User} from "./User";
import {Correspondant} from "./Correspondant";

export interface Message {
    id: number
    message: string
    emitter: string
    receptor: string
    matchId: number
}
