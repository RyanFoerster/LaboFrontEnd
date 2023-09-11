import {Routes} from "@angular/router";

export default [{
    path: "",
    children: [
        {
            path: "",
            loadComponent: () => import("./components/job-offer-list/job-offer-list.component").then(module => module.JobOfferListComponent)
        },
        {
            path: "create",
            loadComponent: () => import("./components/create-job-offer/create-job-offer.component").then(module => module.CreateJobOfferComponent)
        },
        {
            path: "edit/:id",
            loadComponent: () => import("./components/edit-job-offer/edit-job-offer.component").then(module => module.EditJobOfferComponent)
        },
        {
            path: ":id",
            loadComponent: () => import("./components/single-job-offer/single-job-offer.component").then(module => module.SingleJobOfferComponent)
        }
    ]
}] as Routes
