import {Component} from '@angular/core';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {RouterLink} from "@angular/router";
import {NgIf} from "@angular/common";

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [MatSlideToggleModule, MatToolbarModule, MatButtonModule, MatIconModule, RouterLink, NgIf],
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent{

    // user: User | undefined
    //
    //
    // constructor() {
    //
    // }
    //
    // ngOnInit(): void {
    //     if(this._sessionService.getToken()){
    //         this.user = this._sessionService.getToken()?.userDTO
    //     }
    // }
    //
    // logout() {
    //     this._sessionService.removeFromSession()
    // }
}
