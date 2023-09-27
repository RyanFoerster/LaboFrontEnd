import {TechnologyBackEnd} from "./enums/TechnologyBackEnd";
import {TechnologyFrontEnd} from "./enums/TechnologyFrontEnd";

export interface PostHelpForm{
    title: string
    technologyFrontEnd?: TechnologyFrontEnd
    technologyBackEnd?: TechnologyBackEnd
    description: string
    gitHub: string
}
