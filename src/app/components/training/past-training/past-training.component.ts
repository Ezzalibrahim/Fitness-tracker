import { AfterViewInit, Component, OnInit ,ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';

import { Exercise } from 'src/app/services/training/exercise.model';
import { TrainingService } from 'src/app/services/training/training.service';
import * as TrainingReducer  from '../../../store/training/training.reducer'

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit , AfterViewInit {
  @ViewChild(MatSort) sort : MatSort; 
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['name', 'duration','calories','date','state'];
  pastExercises : MatTableDataSource<Exercise> = new MatTableDataSource();


  constructor(private trainingService : TrainingService,
              private store : Store<TrainingReducer.State>) { }

  ngOnInit(): void {
    this.store.select(TrainingReducer.getFinishedExercises).subscribe((exercises : Exercise[]) => {
      this.pastExercises.data = exercises;
    });
    this.trainingService.fetchPastExercises();
  }

  ngAfterViewInit(): void {
      this.pastExercises.sort = this.sort;
      this.pastExercises.paginator =  this.paginator;
  }

  doFilter(filter : string){
    this.pastExercises.filter = filter.trim().toLowerCase();
  }


}
