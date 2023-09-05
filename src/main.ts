import {importProvidersFrom} from '@angular/core';
import {bootstrapApplication, BrowserModule} from '@angular/platform-browser';
import {provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {AppComponent} from "./app/app.component";
import {provideAnimations} from "@angular/platform-browser/animations";
import {provideRouter, Routes} from "@angular/router";

const routes: Routes = [
    {
        path: "",
        redirectTo: "home",
        pathMatch: "full"
    },
    {
        path: "home",
        loadComponent: () => import("./app/home/home.component").then(module => module.HomeComponent)
    }
]

bootstrapApplication(AppComponent, {
    providers: [
    importProvidersFrom(BrowserModule),
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations()
]
})
    .catch(err => console.error(err));
