import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
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
  favorites: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getMovies();
    this.getFavorites();
  }

  /**
   * Get all array of all movie objects from API and save in variable movies 
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
    });
  }

  /**
   * Get favorite movies of current user from API and save in variable favorites 
   */
  getFavorites(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.favorites = resp.FavoriteMovies;
    })
  }

  /**
   * Checks whether a specific movie id is in the array of favorites of current user
   * @param movie_id - id of a specific movie 
   * @returns true if movie is a favorite, false if not
   */
  isFavorite(movie_id: string): boolean {
    return this.favorites.includes(movie_id);
  }

  /**
   * Removes a specific movie id from the array of favorites of current user
   * @param movie_id - id of a specific movie 
   */
  removeFavorite(movie_id: string): void {
    this.fetchApiData.deleteFavorite(movie_id).subscribe((resp: any) => {
      this.favorites = this.favorites.filter(id => id !== movie_id);
    })
  }

  /**
   * Adds a specific movie id to the array of favorites of current user
   * @param movie_id - id of a specific movie 
   */
  addFavorite(movie_id: string): void {
    this.fetchApiData.addFavorite(movie_id).subscribe((resp: any) => {
      this.favorites.push(movie_id);
    });
  }

  /**
   * Open GenreViewComponent with information on specific genre as a dialog. 
   * Passes data to child component via injection. 
   * @param genreName - name of genre
   * @param genreDescription - short description 
   */
  openGenreDialog(genreName: string, genreDescription: string): void {
    this.dialog.open(GenreViewComponent, {
      width: '500px',
      data: {
        genreName: genreName,
        genreDescription: genreDescription
      }
    });
  }

  /**
   * Open DirectorViewComponent with information on specific director as a dialog.
   * Passes data to child component via injection. 
   * @param director - object with information on director
   * @param director.Name - name of director
   * @param director.Bio - short biography
   * @param director.Birth - birth date  
   * @param director.Death - death date (optional) 
   */
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

  /**
   * Open SynopsisViewComponent with short summary of movie as a dialog.
   * Passes data to child component via injection. 
   * @param title - movie title
   * @param director - name of director
   * @param synopsis - short summary of movie
   */
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
