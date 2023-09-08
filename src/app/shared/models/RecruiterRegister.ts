import {CompanyForm} from "./CompanyForm";
import {Address} from "./Address";

export interface RecruiterRegister {
    username: string
    password: string
    firstName: string
    lastName: string
    email: string
    companyForm: CompanyForm
}
