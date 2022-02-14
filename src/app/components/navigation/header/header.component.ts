import { Component, OnInit ,EventEmitter , Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit , OnDestroy {
  @Output() onToggle = new EventEmitter();
  subscription : Subscription = new Subscription();

  isAuth : boolean = false;


  constructor(private authService : AuthService) { }

  ngOnInit(): void {
    this.subscription = this.authService.authChange.subscribe((authStatus)=>{
      this.isAuth = authStatus
    })
  }

  logout(){
    this.authService.logOutUser();
  }
  
  ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

  onToggleSidenav(){
    this.onToggle.emit();
  }

}
