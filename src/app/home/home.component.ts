import {Component, OnInit} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {AuthService} from "../shared/services/auth.service";
import {User} from "../shared/models/User";

import {PostHelp} from "../shared/models/PostHelp";
import {PosthelpService} from "../shared/services/posthelp.service";
import {BehaviorSubject, map, Observable, switchMap, tap} from "rxjs";
import {PostComponent} from "../post/post.component";
import {data} from "autoprefixer";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {TechnologyBackEnd} from "../shared/models/enums/TechnologyBackEnd";
import {TechnologyFrontEnd} from "../shared/models/enums/TechnologyFrontEnd";
import {PostHelpForm} from "../shared/models/PostHelpForm";


@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    imports: [
        NgIf,
        AsyncPipe,
        NgForOf,
        PostComponent,
        ReactiveFormsModule
    ],
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    user?: User
    postsHelp$ = new BehaviorSubject<PostHelp[]>([]);
    technologyBackEnd = Object.values(TechnologyBackEnd)
    technologyFrontEnd = Object.values(TechnologyFrontEnd)
    showForm: boolean = false;
    postForm!: FormGroup;


    constructor(private _authService: AuthService,
                private _posthelpService: PosthelpService,
                private _formBuilder: FormBuilder) {
        this.postForm = this._formBuilder.group({
            title: [null, [Validators.required]],
            technologyBackEnd: [null, []],
            technologyFrontEnd: [null, []],
            description: [null, [
                Validators.required,
                Validators.minLength(10),
                Validators.maxLength(500)
            ]],
            gitHub: [null, [Validators.required]],
        });
    }

    post(): void {
        if (this.user?.role === 'DEVELOPER') {
            if (this.postForm.valid) {
                let newPost: PostHelpForm = this.postForm.value;

                this._posthelpService.createPost(newPost).pipe(
                    switchMap(() => this._posthelpService.getAll()),
                    map(posts => posts.sort((a, b) => b.id - a.id)) // Tri des posts ici
                ).subscribe({
                    next: updatedPosts => {
                        this.postsHelp$.next(updatedPosts);
                        console.log("Post créé avec succès.");
                        this.toggleForm();
                    },
                    error: error => {
                        console.error("Erreur lors de la création du post:", error);
                    }
                });

            } else {
                console.warn("Le formulaire n'est pas valide");
            }
        } else {
            console.warn("L'utilisateur n'a pas la permission de poster");
        }
    }

    ngOnInit() {

        if (this._authService.token) {
            this.user = this._authService.user
        }


        this._posthelpService.getAll().pipe(
            map(posts => posts.sort((a, b) => b.id - a.id))
        ).subscribe(sortedPosts => this.postsHelp$.next(sortedPosts));

    }

    toggleForm(): void {
        this.showForm = !this.showForm;
    }


}
