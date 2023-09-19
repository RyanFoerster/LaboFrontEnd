import {Routes} from "@angular/router";

export default [{
    path: "",
    children: [
        {
            path: ":id",
            loadComponent: () => import("./components/profile/profile.component").then(module => module.ProfileComponent)
        }
    ]
}] as Routes
