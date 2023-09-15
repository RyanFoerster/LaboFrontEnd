import {Address} from "./Address";

export interface DevInfo {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    pseudo: String;
    role: string[];
    address: Address;


}
