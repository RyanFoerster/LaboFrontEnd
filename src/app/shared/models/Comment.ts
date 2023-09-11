import {User} from "./User";
import {VoteComment} from "./VoteComment";

export interface Comment {
    id?: string
    message: string
    dev: User
    voteComments: VoteComment
    score: number
}
