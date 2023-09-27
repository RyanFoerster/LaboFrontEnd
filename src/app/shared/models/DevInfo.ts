import {Address} from "./Address";
export interface DevInfo {
    id: number;
    username: string;
    firstName: string;
    description: string;
    lastName: string;
    email: string;
    pseudo: string;
    gitHub: string;
    linkedIn: string;
    cv: string;
    birthDate: Date;
    technologyBackEnds: string[];
    technologyFrontEnds: string[];
    role: string;
    address: Address;


}
