import {Routes} from "@angular/router";

export default [{
    path: "",
    children: [
        {
            path: "edit/:id",
            loadComponent: () => import("./components/edit-profile/edit-profile.component").then(module => module.EditProfileComponent)
        },
        {
            path: ":id",
            loadComponent: () => import("./components/profile/profile.component").then(module => module.ProfileComponent)
        }
    ]
}] as Routes
