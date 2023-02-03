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

  isLoggedIn(): boolean {
    return localStorage.getItem('token') ? true : false;
  }

  onLogout(): void {
    this.snackBar.open('Good bye.', 'OK', {
      duration: 2000,
      panelClass: ['snackbar']
    });
    localStorage.clear();
  }

}
