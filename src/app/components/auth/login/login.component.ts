import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import * as RootStore from '../../../store/app.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  maxDate : Date = new Date();
  loginForm : FormGroup ;
  isLoading$ : Observable<boolean> ;


  constructor(
    private authService : AuthService ,
    private store : Store<RootStore.State>  ) { }

  ngOnInit(): void {
    this.isLoading$ = this.store.select( RootStore.getIsLoading );
    // we accept only the age greater than 18
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
    this.authService.loginUser({
      email : this.loginForm.value.email,
      password : this.loginForm.value.password
    })
  }

}
