import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://watch-til-death.cyclic.app/';
@Injectable({
  providedIn: 'root'
})

export class FetchApiServices {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }

  //  user registration 
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // login 
  userLogin(username: string, password: string): Observable<any> {
    return this.http.post(apiUrl + 'login?Username=' + username + '&Password=' + password, null).pipe(
      catchError(this.handleError)
    );
  }

  // get all movies
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }


  // Get one movie
  getMovie(movie: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/' + movie, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Get director
  getDirector(director: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/directors/' + director, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Get genre
  getGenre(genre: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/genres/' + genre, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Get user
  getUser(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/' + username, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }


  // Add a movie to favourite Movies
  postFavorite(username: string, movie: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(apiUrl + 'users/' + username + "/" + movie, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Edit user
  editUser(username: string, userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put(apiUrl + 'users/' + username,
      // body = object with user data
      userDetails,
      {
        headers: new HttpHeaders(
          {
            Authorization: 'Bearer ' + token,
          }
        )
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  // Delete user and

  deleteUser(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/' + username,
      {
        headers: new HttpHeaders(
          {
            Authorization: 'Bearer ' + token,
          }
        )
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  // Delete a movie from the favorite movies
  deleteFavorite(username: string, movie: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/' + username + "/" + movie,
      {
        headers: new HttpHeaders(
          {
            Authorization: 'Bearer ' + token,
          }
        )
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }


  // Non-typed response extraction
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }


  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }


}
