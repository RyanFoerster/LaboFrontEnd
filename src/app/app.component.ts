import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {HeaderComponent} from "./core/components/header/header.component";
import {initFlowbite} from "flowbite";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [
        RouterOutlet,
        HomeComponent,
        HeaderComponent
    ],
    standalone: true
})
export class AppComponent implements OnInit{

  title = '2.FrontEnd_finalLab';

    ngOnInit(): void {
        initFlowbite();
    }
}
