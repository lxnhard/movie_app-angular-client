import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  @Input() loginData = { username: '', password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  /**
   * Log in user according to form input via API request, save token + username in localStorage
   * @param username - Username as a string
   * @param password - Password as a string
   */
  loginUser(username: string, password: string): void {
    this.fetchApiData.userLogin(username, password).subscribe((result) => {
      // Logic for a successful user login goes here! (To be implemented)
      localStorage.setItem('token', result.token);
      localStorage.setItem('user', result.user.Username);
      this.dialogRef.close(); // This will close the modal on success!
      this.snackBar.open('Welcome!', 'OK', {
        duration: 2000,
        panelClass: ['snackbar']
      });
      this.router.navigate(['movies']);
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000,
        panelClass: ['snackbar']
      });
    });
  }

}