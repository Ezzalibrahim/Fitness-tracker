import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as TrainingStore  from 'src/app/store/training/training.reducer';


@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  onGoingTraining$: Observable<boolean>;

  constructor(private store : Store<TrainingStore.TrainingState>) { }

  ngOnInit(): void {
    this.onGoingTraining$ = this.store.select(TrainingStore.getIsTraining);
  }

}
