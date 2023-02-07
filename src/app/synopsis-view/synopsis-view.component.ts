import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-synopsis-view',
  templateUrl: './synopsis-view.component.html',
  styleUrls: ['./synopsis-view.component.scss']
})
export class SynopsisViewComponent {
  synopsis: string;
  title: string;
  director: string;

  constructor(
    /* inject data from movie card component */
    private dialogRef: MatDialogRef<SynopsisViewComponent>, @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.synopsis = data.Synopsis,
      this.title = data.Title,
      this.director = data.Director
  }
}
