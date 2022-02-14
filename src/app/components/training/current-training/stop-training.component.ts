import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";


@Component({
    selector:'app-stop-training',
    template : `<div class="">
                    <h1 mat-dialog-title>Are You Sure! to Stop?</h1> 
                    <mat-dialog-content>
                        You aready pass {{ passedData.progress }} % of your Exercise
                    </mat-dialog-content>
                    <mat-dialog-actions>
                        <button mat-button [mat-dialog-close] ="true" >Yes</button>
                        <button mat-button [mat-dialog-close] ="false" >No</button>
                    </mat-dialog-actions>
                </div>
                `
})
export class StopTrainingComponent{
    
    constructor(@Inject(MAT_DIALOG_DATA) public passedData : any){

    }
}