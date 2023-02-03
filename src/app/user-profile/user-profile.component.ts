import { Component, OnInit, Input } from '@angular/core';
import { FetchApiServices } from '../fetch-api-data.service'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent implements OnInit {
  user: any = {};

  @Input() user_new = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: FetchApiServices,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  // lifecycle hook: called after creating component
  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      resp.Birthday = resp.Birthday.slice(0, 10);
      this.user = resp;
      return this.user;
    });
  }

  editUser(): void {
    this.fetchApiData.editUser(this.user_new).subscribe((result) => {
      // this.dialogRef.close(); // This will close the modal on success!
      // this.router.navigate(['/welcome']);
      localStorage.setItem('user', result.Username);
      this.snackBar.open('Your profile has been updated.', 'OK', {
        duration: 2000,
        panelClass: ['snackbar']
      });
      this.getUser();
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000,
        panelClass: ['snackbar']
      });
    });
  }

  deleteUser(): void {
    if (confirm("Are you sure you want to delete your user profile irrevocably?")) {
      this.fetchApiData.deleteUser().subscribe((result) => {
        localStorage.clear();
        this.snackBar.open('Your profile has been deleted.', 'OK', {
          duration: 2000,
          panelClass: ['snackbar']
        });
        this.router.navigate(['welcome']);
      }, (result) => {
        this.snackBar.open(result, 'OK', {
          duration: 2000,
          panelClass: ['snackbar']
        });
        this.router.navigate(['welcome']);
      });

    }
  }

}
