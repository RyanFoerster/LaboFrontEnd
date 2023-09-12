import {TechnologyFrontEnd} from "./enums/TechnologyFrontEnd";
import {TechnologyBackEnd} from "./enums/TechnologyBackEnd";
import {Comment} from "./Comment";
import {VoteSujet} from "./VoteSujet";

export interface PostHelp {
    id: number
    title: string
    technologyFrontEnd?: TechnologyFrontEnd
    technologyBackEnd?: TechnologyBackEnd
    description: string
    github: string
    ouvert: boolean
    comments: Comment[]
    voteSujets: VoteSujet
    score: number

}
