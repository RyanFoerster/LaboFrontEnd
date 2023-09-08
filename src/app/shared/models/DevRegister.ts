import {DevInfoForm} from "./DevInfoForm";
import {Address} from "./Address";

export interface DevRegister {
    username: string
    password: string
    firstName: string
    lastName: string
    email: string
    devProfileUpdateForm: DevInfoForm
    addressForm: Address
}
