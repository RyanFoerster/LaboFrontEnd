import {importProvidersFrom} from '@angular/core';
import {bootstrapApplication, BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {AppComponent} from "./app/app.component";
import {provideAnimations} from "@angular/platform-browser/animations";
import {provideRouter, Routes} from "@angular/router";
import {authGuard} from "./app/guards/auth.guard";
import {AuthService} from "./app/shared/services/auth.service";
import {JwtInterceptor} from "./app/interceptors/jwt.interceptor";

const routes: Routes = [
    {
        path: "",
        redirectTo: "home",
        pathMatch: "full",
    },
    {
        path: "home",
        loadComponent: () => import("./app/home/home.component").then(module => module.HomeComponent),
        canActivate: [authGuard]
    },
    {
        path: "",
        loadChildren: () => import("./app/auth/auth.routes")
    },
    {
        path: "job-offers",
        loadChildren: () => import("./app/jobOffers/job-offer.routes")
    },
    {
        path: "chat",
        loadComponent: () => import("./app/chat/chat.component").then(module => module.ChatComponent)
    },
    {
        path: "**",
        redirectTo: "home",
        pathMatch: "full",
    }

]

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule),
        {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
        provideRouter(routes),
        provideAnimations(),
        provideHttpClient(withInterceptorsFromDi())
    ]
})
    .catch(err => console.error(err));
