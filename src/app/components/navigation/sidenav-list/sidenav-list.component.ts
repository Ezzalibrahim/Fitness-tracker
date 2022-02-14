import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit , OnDestroy{
  @Output() onToggle = new EventEmitter();
  subscription : Subscription = new Subscription();
  isAuth : boolean = false;

  constructor(private authService : AuthService) { }

  ngOnInit(): void {
    this.subscription = this.authService.authChange.subscribe((authStatus)=>{
      this.isAuth = authStatus;
    })
  }
  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

  onToggleSidenav(){
    this.onToggle.emit();
  }

  logout(){
    this.onToggleSidenav();
    this.authService.logOutUser();
  }

}
