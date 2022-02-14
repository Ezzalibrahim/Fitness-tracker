import { AfterViewInit, Component, OnDestroy, OnInit ,ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';

import { Exercise } from 'src/app/services/training/exercise.model';
import { TrainingService } from 'src/app/services/training/training.service';


@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit , AfterViewInit ,OnDestroy {
  @ViewChild(MatSort) sort : MatSort; 
  @ViewChild(MatPaginator) paginator: MatPaginator;
  exercisesSubscription : Subscription;

  displayedColumns: string[] = ['name', 'duration','calories','date','state'];
  pastExercises : MatTableDataSource<Exercise> = new MatTableDataSource();


  constructor(private trainingService : TrainingService) { }

  ngOnInit(): void {
    this.trainingService.fetchPastExercises();
    this.exercisesSubscription = this.trainingService.finishedExercisesChanged.subscribe(
      (finishedexercises)=>{
        this.pastExercises.data =  finishedexercises;
      }
    );
  }

  ngAfterViewInit(): void {
      this.pastExercises.sort = this.sort;
      this.pastExercises.paginator =  this.paginator;
  }

  doFilter(filter : string){
    this.pastExercises.filter = filter.trim().toLowerCase();
  }

  ngOnDestroy(): void {
    if(this.exercisesSubscription){
      this.exercisesSubscription.unsubscribe();
    }
  }

}
