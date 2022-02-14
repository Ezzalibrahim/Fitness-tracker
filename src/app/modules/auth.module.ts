import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { AngularFireAuthModule } from '@angular/fire/compat/auth';


import { LoginComponent } from "../components/auth/login/login.component";
import { SignupComponent } from "../components/auth/signup/signup.component";
import { SharedModule } from "./seared.module";
import { AuthRoutingModule } from "../routes/auth-routing.module";


@NgModule({
    declarations :[SignupComponent , LoginComponent],
    imports : [
        SharedModule,
        ReactiveFormsModule,
        AngularFireAuthModule,
        AuthRoutingModule
    ],
    exports : []
})
export class AuthModule{}