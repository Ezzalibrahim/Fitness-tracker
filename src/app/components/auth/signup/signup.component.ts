import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UIService } from 'src/app/seared/ui.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AuthData } from 'src/app/services/auth/authData.model';
import { User } from 'src/app/services/auth/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit , OnDestroy{

  maxDate = new Date();
  private authdata !: AuthData;
  public user ?: User|undefined;
  isLoading : boolean = false;
  isLoadingSubscription : Subscription;


  constructor(private authService : AuthService , private uiService : UIService) { }

  ngOnInit(): void {
    this.isLoadingSubscription = this.uiService.isLoading.subscribe(
      (isLoad)=>{
        this.isLoading = isLoad;
      }
    )
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  onSubmit(form : NgForm){
    console.log(form);
    this.authdata = {
      email : form.value.email,
      password : form.value.password
    }
    this.authService.registerUser(this.authdata);
    //this.user = this.authService.getUser();
  }

  ngOnDestroy(): void {
    if(this.isLoadingSubscription){
      this.isLoadingSubscription.unsubscribe();
    }
  }

}
