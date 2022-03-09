import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import * as RootReducer from '../../store/app.reducer';
import { Store } from "@ngrx/store";

@Injectable()
export class AuthGard implements CanActivate , CanLoad{

    constructor( private store : Store<RootReducer.State>){}


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.store.select(RootReducer.getIsAuth).pipe(take(1));
    }

    canLoad(route: Route): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.store.select(RootReducer.getIsAuth).pipe(take(1));
    }
}