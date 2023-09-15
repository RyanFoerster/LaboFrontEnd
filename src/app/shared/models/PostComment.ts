import {User} from "./User";
import {VoteComment} from "./VoteComment";

export interface PostComment {
    id: number
    message: string
    dev: User
    voteComments: VoteComment
    score: number
}
