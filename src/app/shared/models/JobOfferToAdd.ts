import {TechnologyFrontEnd} from "./enums/TechnologyFrontEnd";
import {TechnologyBackEnd} from "./enums/TechnologyBackEnd";

export interface JobOfferToAdd{
    title:string;
    description:string;
    technologyFrontEnds: TechnologyFrontEnd[];
    technologyBackEnds: TechnologyBackEnd[];
    link: string;
}
