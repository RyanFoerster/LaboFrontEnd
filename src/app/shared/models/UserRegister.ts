import {DevInfoForm} from "./DevInfoForm";
import {Address} from "./Address";

export interface UserRegister {
    id?: string
    username: string
    password: string
    firstName: string
    lastName: string
    email: string
    roles?: string[]
    devProfileUpdateForm: DevInfoForm
    addressForm: Address
}
