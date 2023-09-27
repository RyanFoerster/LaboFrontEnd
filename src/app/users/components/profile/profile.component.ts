import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../shared/services/auth.service";
import {User} from "../../../shared/models/User";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {DevInfo} from "../../../shared/models/DevInfo";
import {Observable, tap} from "rxjs";
import {UserService} from "../../../shared/services/user.service";
import {Recruiter} from "../../../shared/models/Recruiter";
import {Router, RouterLink} from "@angular/router";
import {TechnologyBackEnd} from "../../../shared/models/enums/TechnologyBackEnd";
import {TechnologyFrontEnd} from "../../../shared/models/enums/TechnologyFrontEnd";
import {DevService} from "../../../shared/services/dev.service";
import {data} from "autoprefixer";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    standalone: true,
    imports: [
        NgIf,
        ReactiveFormsModule,
        AsyncPipe,
        NgForOf,
        RouterLink
    ],
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    connectedUser ?: User;
    devInfoSub!: Observable<DevInfo>;
    recruiterSub!: Observable<Recruiter>;
    editPassword: boolean = false;
    editProfile: boolean = false;
    editAddress: boolean = false;
    editCompany: boolean=false;
    newPasswordForm: FormGroup;
    devInfoForm: FormGroup;
    companyForm: FormGroup;
    addressForm: FormGroup;
    recruiterForm: FormGroup;
    technologiesBackEnd: string[] = Object.values(TechnologyBackEnd);
    technologiesFrontEnd: string[] = Object.values(TechnologyFrontEnd);
    frontTechnologiesInDB!: String[];
    backTechnologiesInDB!: String[];
    fileToUpload: File | null = null;

    constructor(private _authService: AuthService,
                private _userService: UserService,
                private _devService: DevService,
                private _FB: FormBuilder,
                private _router: Router) {

        this.newPasswordForm = _FB.group(
            {
                password: [null, [
                    Validators.required,
                    Validators.minLength(6),
                    Validators.pattern(/^(?=.*[!=@#$%^&*()_+{}\[\]:;<>,.?~\-]).*(?=.*[A-Z]).*(?=.*[0-9]).*$/)
                ]
                ]
            }
        )

        this.devInfoForm = _FB.group({
            firstName: ["", []],
            lastName: ["", []],
            description: ["", []],
            technologyBackEnds: this._FB.array([], []),
            technologyFrontEnds: this._FB.array([], []),
            gitHub: ["", []],
            cv: ["", []],
            linkedIn: ["", []],
            pseudo: ["", []]
        })

        this.recruiterForm = _FB.group({
            firstName: ["",[]],
            lastName: ["",[]]
        })

        this.addressForm = this._FB.group({
            street: ["", [Validators.required]],
            number: ["", [Validators.required]],
            city: ["", [Validators.required]],
            zipcode: ["", [Validators.required]],
            country: ["", [Validators.required]]
        })

        this.companyForm = _FB.group({
            name: ["", [Validators.required]],
            description: ["", [Validators.required]]
        })
    }

    ngOnInit(): void {
        this.connectedUser = this._authService.user

        if (this.connectedUser && this.connectedUser?.role === "DEVELOPER") {
            this.devInfoSub = this._userService.getDevInfoFromServer(this.connectedUser?.id);
            this.devInfoSub.subscribe((data) => {
                this.devInfoForm.patchValue(data);
                this.frontTechnologiesInDB = data.technologyFrontEnds;
                this.backTechnologiesInDB = data.technologyBackEnds;
                console.log(this.frontTechnologiesInDB);
                this.devInfoForm.setControl('technologyBackEnds', this._FB.array(data.technologyBackEnds));
                this.devInfoForm.setControl('technologyFrontEnds', this._FB.array(data.technologyFrontEnds));
            })
            // this._userService.getDevInfoFromServer(this.connectedUser.id).subscribe((data) => {
            //     this.frontTechnologiesInDB = data.technologyFrontEnds;
            //     this.devInfoForm.patchValue({technologiesFrontEnd:this.frontTechnologiesInDB});
            // })
            // this._userService.getDevInfoFromServer(this.connectedUser.id).subscribe((data) => {
            //     this.backTechnologiesInDB = data.technologyBackEnds;
            //     this.devInfoForm.patchValue(data);
            // })

        }
        if (this.connectedUser && this.connectedUser.role === "RECRUITER")

            this.recruiterSub = this._userService.getRecruiterInfoFromServer(this.connectedUser.id)


    }
    
    updateDevPassword() {
        this._userService.updateDevPassword(this.newPasswordForm.value).pipe(
            tap(() => this._router.navigateByUrl('/home'))
        ).subscribe();
    }

    updateRecPassword() {
        this._userService.updateRecPassword(this.newPasswordForm.value).pipe(
            tap(() => this._router.navigateByUrl('/home'))
        ).subscribe();
    }

    setPassword() {
        this.editPassword = !this.editPassword;
    }

    modifyProfile() {
        this.editProfile = !this.editProfile;
    }

    updateDevProfile() {
        this._userService.updateDev(this.devInfoForm.value).pipe(
            tap(() => location.reload())
        ).subscribe();
    }

    get frontFormArray(): FormArray {
        return this.devInfoForm.get('technologyFrontEnds') as FormArray;
    }

    updateFrontTecs(event: any) {
        console.log(this.frontFormArray)
        const value = event.target.value;
        if (event.target.checked) {
            this.frontFormArray.push(this._FB.control(value));
        } else {
            const index = this.frontFormArray.value.indexOf(value);
            if (index >= 0) {
                this.frontFormArray.removeAt(index);
            }
        }
    }

    get backFormArray(): FormArray {
        return this.devInfoForm.get('technologyBackEnds') as FormArray;
    }

    updateBackTecs(event: any) {
        const value = event.target.value;
        if (event.target.checked) {
            this.backFormArray.push(this._FB.control(value));
        } else {
            const index = this.backFormArray.value.indexOf(value);
            if (index >= 0) {
                this.backFormArray.removeAt(index);
            }
        }
    }

    isFrontTechnologyInDB(tech: String): boolean {
        return this.frontTechnologiesInDB ? this.frontTechnologiesInDB.includes(tech) : false;
    }

    isBackTechnologyInDB(tech: String): boolean {
        return this.backTechnologiesInDB ? this.backTechnologiesInDB.includes(tech) : false;
    }

    modifyAddress(){
        this.editAddress=!this.editAddress;
    }

    updateAddress() {
        this._userService.updateDevAddress(this.addressForm.value).pipe(
            tap(() => location.reload())
        ).subscribe();
    }

    updateRec() {
        this._userService.updateRec(this.recruiterForm.value).pipe(
            tap(()=>location.reload())
        ).subscribe();
    }

    updateCompany() {
        this._userService.updateCompany(this.companyForm.value).pipe(
            tap(()=>location.reload())
        ).subscribe();
    }

    updateCompanyAddress() {
        this._userService.updateCompanyAddress(this.addressForm.value).pipe(
            tap(()=>location.reload())
        ).subscribe();
    }

    modifyCompany() {
        this.editCompany=!this.editCompany;
    }

    handleFileInput(event: any): void {
        this.fileToUpload = <File>event.target.files[0];
    }

    uploadCV(devId: number): void {
        console.log("1 - "+ this.fileToUpload?.name)
        if (this.fileToUpload) {
            console.log("2 - "+ this.fileToUpload.name)
            this._devService.uploadCV(devId, this.fileToUpload).subscribe({
                next : response => console.log("Cv upload successfully", response),
                error : error => console.log("Error uploading the CV", error)
            })

            //     .pipe(
            //     tap({
            //         next : response => console.log("Cv upload successfully", response),
            //         error : error => console.log("Error uploading the CV", error)
            //     })
            // )
        }
    }

    downloadCV(devId: number): void {
        this._devService.downloadCV(devId).subscribe({
            next : data => {
                const blob = new Blob([data], { type: 'application/pdf' }); // assuming it's a pdf file
                const url= window.URL.createObjectURL(blob);
                window.open(url);
            },
            error : error => {
                console.error("Error downloading the file.", error);
            }
        })
    }

    getFileNameFromPath(path: string): string {
        // @ts-ignore
        return path.split('\\').pop().split('/').pop();
    }
}
