import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SignupPopupComponent } from '../../COMPONENTS/Landing Page/signup-popup/signup-popup.component';
import { LoginPopupComponent } from '../../COMPONENTS/Landing Page/login-popup/login-popup.component';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
})
export class LandingPageComponent {

  constructor(public dialog: MatDialog) {}

  signupPopup(): void {
    const dialogRef = this.dialog.open(SignupPopupComponent, {
      width: '300px', 
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The popup was closed');
    });
  }

  loginPopup(): void {
    const dialogRef = this.dialog.open(LoginPopupComponent, {
      width: '300px', 
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The popup was closed');
    });
  }
}
