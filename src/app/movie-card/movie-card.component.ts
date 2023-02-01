import { Component, OnInit } from '@angular/core';
import { FetchApiServices } from '../fetch-api-data.service'
import { MatDialog } from '@angular/material/dialog';
import { GenreViewComponent } from '../genre-view/genre-view.component';

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
}
