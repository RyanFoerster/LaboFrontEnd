import {Address} from "./Address";
import {TechnologyBackEnd} from "./enums/TechnologyBackEnd";
import {TechnologyFrontEnd} from "./enums/TechnologyFrontEnd";

export interface DevInfo {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    pseudo: string;
    gitHub: string;
    linkedIn: string;
    cv: string;
    birthDate: Date;
    technologiesBackEnd: TechnologyBackEnd[];
    technologiesFrontEnd: TechnologyFrontEnd[];
    role: string[];
    address: Address;


}
