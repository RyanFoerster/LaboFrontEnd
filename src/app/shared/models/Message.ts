import {User} from "./User";
import {Correspondant} from "./Correspondant";

export interface Message {
    id: number
    message: string
    emitter: Correspondant
    receptor: Correspondant
    matchId: number
}
