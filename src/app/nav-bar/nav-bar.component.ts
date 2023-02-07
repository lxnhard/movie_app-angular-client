import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

  constructor(
    public snackBar: MatSnackBar
  ) { }

  /**
   * Check whether user is currently logged in
   * @returns true if logged in, false if not
   */
  isLoggedIn(): boolean {
    return localStorage.getItem('token') ? true : false;
  }

  /**
   * Log out by clearing local storage (token, username) and display Good bye snackbar
   */
  onLogout(): void {
    this.snackBar.open('Good bye.', 'OK', {
      duration: 2000,
      panelClass: ['snackbar']
    });
    localStorage.clear();
  }
}
