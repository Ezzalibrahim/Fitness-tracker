import { NgModule } from "@angular/core";
import {Routes , RouterModule} from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { AuthGard } from "./services/auth/auth.gard";

const routes : Routes = [
    {
        path : '' , component : HomeComponent
    },
    {
        path : 'training' ,
        loadChildren : () => import('./modules/training.module').then(result => result.TrainingModule),
        canLoad : [AuthGard]
    }
]

@NgModule({
    imports : [ RouterModule.forRoot(routes) ],
    exports : [ RouterModule ],
    providers :[ AuthGard ]
})
export class AppRoutingModule{}