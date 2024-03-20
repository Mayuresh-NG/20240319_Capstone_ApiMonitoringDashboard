// Import necessary modules and components
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SignupPopupComponent } from '../signup-popup/signup-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SignupService } from '../../CORE/services/auth.service';

@Component({
  selector: 'app-login-popup',
  templateUrl: './login-popup.component.html',
  styleUrls: ['./login-popup.component.css'],
})
export class LoginPopupComponent {
  showAlert:any 
  constructor(
    public dialogRef: MatDialogRef<LoginPopupComponent>, // Inject MatDialogRef for dialog functionality
    @Inject(MAT_DIALOG_DATA) public data: any, // Inject MAT_DIALOG_DATA for passing data to the dialog
    public dialog: MatDialog,
    private router: Router,
    private signupService : SignupService
  ) {}

  // Close the dialog
  closePopup(): void {
    this.dialogRef.close(); 
  }

  openPopup(): void {
    // Close the current dialog
    this.closePopup(); 
    // Open the SignupPopupComponent dialog
    const dialogRef = this.dialog.open(SignupPopupComponent, {
      width: '300px', 
    });

    dialogRef.afterClosed().subscribe((result) => {
      // Log when the popup is closed
      console.log('The popup was closed'); 
    });
  }

  navigateToForgotPassword() {
    this.router.navigate(['/forgotpassword']);
    this.closePopup()
  }

  email: string = ''; // Initialize username variable
  emailInputFocused: boolean = false; // Track if username input is focused
  passwordInputFocused: boolean = false; // Track if password input is focused
  password: string = ''; // Initialize password variable

  onContinueClick(): void {
    console.log('Username:', this.email); // Log username when "Continue" button is clicked
    console.log('Password:', this.password); // Log password when "Continue" button is clicked
  }

  login() {
    const userData = {
      email: this.email,
      password: this.password,
    };

    this.signupService.loginUser(userData).subscribe(
      (response) => {
        // Handle successful signup
        console.log('login successful!', response);
        this.showAlert = true;
        setTimeout(() => {
          this.showAlert = false;
        }, 3000); // Hide t
        this.router.navigate(["/dashboard"]);
        this.closePopup(); 
      },
      (error) => {
        // Handle signup error
        console.error('login failed!', error);
      }
    );
  }

  hideAlert() {
    this.showAlert = false;
  }
}
