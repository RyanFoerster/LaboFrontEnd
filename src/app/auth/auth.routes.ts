import {Routes} from "@angular/router";
import {AuthService} from "../shared/services/auth.service";

export default [{
    path: "",
    children: [
        {
            path: "login",
            title: "Login",
            loadComponent: () => import("./components/login/login.component").then(module => module.LoginComponent)
        },
        {
            path: "register",
            title: "Register",
            loadComponent: () => import("./components/register/register.component").then(module => module.RegisterComponent)
        },
    ]
}] as Routes
