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

export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }

  /**
   * Register new user
   *
   * @param userDetails - an object containing username, password, email and (optionally) birth date 
   * @returns An object containing username, password, email and (optionally) birth date
   */
  public userRegistration(userDetails: { Username: string, Password: string, Email: string, Birthday: any }): Observable<any> {
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
  * Login user
  *
  * @param username - username
  * @param password - password
  * @returns An object containing username, password, email, birth date (optional), favorite movies (optional)
  */
  public userLogin(username: string, password: string): Observable<any> {
    return this.http.post(apiUrl + 'login?Username=' + username + '&Password=' + password, null).pipe(
      catchError(this.handleError)
    );
  }

  /**
  * Get all movies
  *
  * @returns An array of objects containing information about all movies in the database
  */
  public getAllMovies(): Observable<any> {
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


  /**
  * Get user
  *
  * @returns An object containing information about the user currently logged in
  */
  public getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

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


  /**
  * Deletes movie from favorites of current user
  *
  * @param movie - ID of a specific movie.
  */
  public deleteFavorite(movie: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    return this.http.delete(apiUrl + 'users/' + username + "/movies/" + movie,
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


  /**
  * Add a movie to favorites of current user
  *
  * @param movie - ID of a specific movie.
  */
  public addFavorite(movie: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.put(`${apiUrl}users/${username}/movies/${movie}`, null, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
  * Edit profile details of the user currently logged in
  *
  * @param userDetails - an object containing new username, password, email and (optionally) birth date 
  * @returns An object containing the new username, password, email and (optionally) birth date
  */
  public editUser(userDetails: { Username: string, Password: string, Email: string, Birthday: any }): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
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

  /**
  * Delete/unregister current user from database
  *
  */
  public deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
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
