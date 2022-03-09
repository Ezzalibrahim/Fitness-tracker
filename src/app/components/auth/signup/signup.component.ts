import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AuthData } from 'src/app/services/auth/authData.model';
import { User } from 'src/app/services/auth/user.model';

import * as RootReducer from '../../../store/app.reducer'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{

  maxDate = new Date();
  private authdata : AuthData;
  isLoading$ : Observable<boolean> ;
  isLoadingSubscription : Subscription;


  constructor(private authService : AuthService , private store : Store<RootReducer.State>) { }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(RootReducer.getIsLoading);
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  onSubmit(form : NgForm){
    this.authdata = {
      email : form.value.email,
      password : form.value.password
    }
    this.authService.registerUser(this.authdata);
  }


}
