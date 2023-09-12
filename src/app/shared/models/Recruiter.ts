import {User} from "./User";
import {Company} from "./Company";
import {JobOffer} from "./JobOffer";

export interface Recruiter{

    email: string;
    firstName:string;
    lastName:string;
    company : Company;
    jobOffers : JobOffer[];
}
