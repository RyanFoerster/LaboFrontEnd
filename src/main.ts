import {importProvidersFrom} from '@angular/core';
import {bootstrapApplication, BrowserModule} from '@angular/platform-browser';
import {provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {AppComponent} from "./app/app.component";
import {provideAnimations} from "@angular/platform-browser/animations";
import {provideRouter, Routes} from "@angular/router";
import {SessionService} from "./app/shared/services/session.service";

const routes: Routes = [
    {
        path: "",
        redirectTo: "home",
        pathMatch: "full"
    },
    {
        path: "home",
        providers: [SessionService],
        loadComponent: () => import("./app/home/home.component").then(module => module.HomeComponent)
    },
    {
        path: "",
        loadChildren: () => import("./app/auth/auth.routes")
    },
    {
        path: "**",
        redirectTo: "home",
        pathMatch: "full"
    }
]

bootstrapApplication(AppComponent, {
    providers: [
    importProvidersFrom(BrowserModule),
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi())
]
})
    .catch(err => console.error(err));
