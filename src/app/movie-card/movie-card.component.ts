import { Component, OnInit } from '@angular/core';
import { FetchApiServices } from '../fetch-api-data.service'
import { MatDialog } from '@angular/material/dialog';
import { GenreViewComponent } from '../genre-view/genre-view.component';
import { DirectorViewComponent } from '../director-view/director-view.component';
import { SynopsisViewComponent } from '../synopsis-view/synopsis-view.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  constructor(
    public fetchApiData: FetchApiServices,
    public dialog: MatDialog) { }

  // lifecycle hook: called after creating component
  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  openGenreDialog(genreName: string, genreDescription: string): void {
    this.dialog.open(GenreViewComponent, {
      width: '500px',
      data: {
        genreName: genreName,
        genreDescription: genreDescription
      }
    });
  }

  openDirectorDialog(director: { Name: string, Bio: string, Birth: number, Death: number }): void {
    this.dialog.open(DirectorViewComponent, {
      width: '500px',
      data: {
        Name: director.Name,
        Bio: director.Bio,
        Birth: director.Birth,
        Death: director.Death
      }
    });
  }

  openSynopsisDialog(title: string, director: string, synopsis: string): void {
    this.dialog.open(SynopsisViewComponent, {
      width: '500px',
      data: {
        Title: title,
        Director: director,
        Synopsis: synopsis
      }
    });
  }
}
