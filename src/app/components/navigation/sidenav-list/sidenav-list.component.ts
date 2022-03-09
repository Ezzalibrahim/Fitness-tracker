import { Component, EventEmitter , OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import  * as RootStore from '../../../store/app.reducer';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit{
  @Output() onToggle = new EventEmitter();
  isAuth$ : Observable<boolean> ;

  constructor(private authService : AuthService , 
              private store : Store < RootStore.State >) { }

  ngOnInit(): void {
    this.isAuth$ = this.store.select(RootStore.getIsAuth);
  }

  onToggleSidenav(){
    this.onToggle.emit();
  }

  logout(){
    this.onToggleSidenav();
    this.authService.logOutUser();
  }

}
