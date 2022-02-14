import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map} from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import * as StoreApp from '../../../store/app.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  maxDate : Date = new Date();
  loginForm : FormGroup ;
  isLoading$ : Observable<boolean> ;
  isLoadingSubscription : Subscription;


  constructor(
    private authService : AuthService ,
    private store : Store<StoreApp.State>  ) { }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(res => res.ui.isLoading);
    // this.isLoading$ = this.store.pipe(map(status => status.ui.isLoading));
    console.log('isLoading$' , this.isLoading$);
    
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    
    this.loginForm = new FormGroup({
      email : new FormControl('',{
        validators : [Validators.required , Validators.email]
      }),
      password : new FormControl('' , {
        validators : [ Validators.required ]
      })
    });
    

  }

  onSubmit(){
    console.log(this.loginForm);
    
    this.authService.loginUser({
      email : this.loginForm.value.email,
      password : this.loginForm.value.password
    })
  }

}
