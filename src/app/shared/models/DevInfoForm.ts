export interface DevInfoForm {
    firstName:string;
    lastName:string;
    description: string | null;
    birthDate: Date | null;
    technologiesBackEnd: string[] | null;
    technologiesFrontEnd: string[] | null;
    gitHub: string | null;
    linkedIn: string | null;
    cv: string | null;
    pseudo: string | null;
}
