import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SignupPopupComponent } from '../../COMPONENTS/signup-popup/signup-popup.component';
import { LoginPopupComponent } from '../../COMPONENTS/login-popup/login-popup.component';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
})
export class LandingPageComponent {
  constructor(public dialog: MatDialog) {}

  // Function to open the popup
  signupPopup(): void {
    const dialogRef = this.dialog.open(SignupPopupComponent, {
      width: '300px', // Adjust the width based on your design
    });

    // Handle the popup closure
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The popup was closed');
    });
  }

  // Function to open the popup
  loginPopup(): void {
    const dialogRef = this.dialog.open(LoginPopupComponent, {
      width: '300px', // Adjust the width based on your design
    });

    // Handle the popup closure
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The popup was closed');
    });
  }
}
