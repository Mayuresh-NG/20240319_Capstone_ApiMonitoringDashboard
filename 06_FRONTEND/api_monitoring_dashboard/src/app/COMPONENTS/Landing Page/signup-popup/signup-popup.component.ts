// Importing necessary Angular modules and components
import { Component, Inject } from '@angular/core';
import { FormControl, FormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { LoginPopupComponent } from '../login-popup/login-popup.component';
import { SignupService } from '../../../CORE/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup-popup',
  templateUrl: './signup-popup.component.html',
  styleUrl: './signup-popup.component.css',
})
export class SignupPopupComponent {
  constructor(
    // Dialog reference for popup
    public dialogRef: MatDialogRef<SignupPopupComponent>,
    // Injecting data into the dialog
    @Inject(MAT_DIALOG_DATA) public data: any,
    // Dialog service for opening/closing dialogs
    public dialog: MatDialog,
    private signupService: SignupService,
    private _snackBar: MatSnackBar
  ) {}

  // Method to close the signup popup
  closePopup(): void {
    this.dialogRef.close();
  }

  // Method to show login popup
  showLoginPopup(): void {
    this.closePopup();
    const dialogRef = this.dialog.open(LoginPopupComponent, {
      width: '300px',
    });

    // Handling the closure of the login popup
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The popup was closed');
    });
  }

  // Initializing variables and form controls for user inputs
  showAlert: boolean = false;
  showAlerts: boolean = false;
  fullName: string = '';
  email: string = '';
  password: string = '';
  mobileNumber:any;
  fullNameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(50),
  ]);
  fullNameInputFocused: boolean = false;
  emailInputFocused: boolean = false;
  passwordInputFocused: boolean = false;
  mobileNumberInputFocused : boolean =false;

  signup() {
    const userData = {
      fullName: this.fullName,
      email: this.email,
      password: this.password,
      mobile: this.mobileNumber
    };

    this.signupService.signupUser(userData).subscribe(
      (response) => {
        // Handle successful signup
        console.log('Signup successful!', response);
        this.showAlert = true;
        setTimeout(() => {
          this.showAlert = false;
        }, 3000); // Hide t
      },
      (error) => {
        // Handle signup error
        console.error('Signup failed!', error);
        if (error.status === 400) {
          this.showAlerts = true;
          setTimeout(() => {
            this.showAlerts = false;
          }, 3000);
        }
      }
    );
  }
  hideAlert() {
    this.showAlert = false;
  }
}
