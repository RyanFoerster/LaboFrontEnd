import {JobOffer} from "./JobOffer";

export interface JobOfferIndex{
    total: number;
    result: JobOffer[]|null;
}
