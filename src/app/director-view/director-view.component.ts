import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-director-view',
  templateUrl: './director-view.component.html',
  styleUrls: ['./director-view.component.scss']
})

export class DirectorViewComponent {
  Director: any;

  constructor(
    /* inject data from movie card component */
    private dialogRef: MatDialogRef<DirectorViewComponent>, @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.Director = { Name: data.Name, Bio: data.Bio, Birth: data.Birth, Death: data.Death }
  }
}