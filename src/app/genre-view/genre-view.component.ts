import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";


@Component({
  selector: 'app-genre-view',
  templateUrl: './genre-view.component.html',
  styleUrls: ['./genre-view.component.scss']
})

export class GenreViewComponent {
  genreName: string = "";
  genreDescription: string = "";

  constructor(
    /* inject data from movie card component */
    private dialogRef: MatDialogRef<GenreViewComponent>, @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.genreName = data.genreName;
    this.genreDescription = data.genreDescription;
  }
}
