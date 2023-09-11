import {TechnologyFrontEnd} from "./enums/TechnologyFrontEnd";
import {TechnologyBackEnd} from "./enums/TechnologyBackEnd";
import {Recruiter} from "./Recruiter";

export interface JobOffer{
    id: string;
    title: string;
    description: string;
    technologyFrontEnds: TechnologyFrontEnd[];
    technologyBackEnds: TechnologyBackEnd[];
    link: string;
    recruiter: Recruiter;


}
