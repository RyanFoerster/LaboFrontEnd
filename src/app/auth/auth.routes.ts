import {Routes} from "@angular/router";

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
        {
             path:"dev/:confirmationToken",
            loadComponent:()=> import("./components/dev-active-account/dev-active-account.component").then(module => module.DevActiveAccountComponent)
        },
        {
            path:"recruiter/:confirmationToken",
            loadComponent:()=> import("./components/recruiter-active-account/recruiter-active-account.component").then(module => module.RecruiterActiveAccountComponent)
        }
    ]
}] as Routes
