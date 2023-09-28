import {TechnologyFrontEnd} from "./enums/TechnologyFrontEnd";
import {TechnologyBackEnd} from "./enums/TechnologyBackEnd";
import {PostComment} from "./PostComment";
import {VoteSujet} from "./VoteSujet";

export interface PostHelp {
    id: number
    title: string
    technologyFrontEnd?: TechnologyFrontEnd
    technologyBackEnd?: TechnologyBackEnd
    description: string
    gitHub: string
    ouvert: boolean
    comments: PostComment[]
    voteSujets: VoteSujet
    score: number

}
