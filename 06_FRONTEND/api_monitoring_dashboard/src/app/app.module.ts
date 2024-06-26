import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterOutlet } from '@angular/router';
import { DashboardComponent } from './PAGES/dashboard/dashboard.component';
import { LandingPageComponent } from './PAGES/landing-page/landing-page.component';
import { LoginPopupComponent } from './COMPONENTS/Landing Page/login-popup/login-popup.component';
import { SignupPopupComponent } from './COMPONENTS/Landing Page/signup-popup/signup-popup.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { ApiManagementComponent } from './COMPONENTS/API Management/api-management/api-management.component';
import { AnalyticsComponent } from './COMPONENTS/Performance Component/analytics/analytics.component';
import { AlertsComponent } from './COMPONENTS/Alert Component/alerts/alerts.component';
import { DashboardDataComponent } from './COMPONENTS/Analytics component/dashboard-data/dashboard-data.component';

import { OverlayModule } from '@angular/cdk/overlay';
import { MatSelectModule } from '@angular/material/select';
import { ResponseChartComponent } from './COMPONENTS/Performance Component/response-chart/response-chart.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DashbaordChartsComponent } from './COMPONENTS/Analytics component/dashbaord-charts/dashbaord-charts.component';
import { AlertDataComponent } from './COMPONENTS/Alert Component/alert-data/alert-data.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DeleteConfirmationComponent } from './COMPONENTS/API Management/delete-confirmation/delete-confirmation.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmDeleteAlertComponent } from './COMPONENTS/Alert Component/confirm-delete-alert/confirm-delete-alert.component';
import { ToastrModule } from 'ngx-toastr';
import { NotFoundComponent } from './PAGES/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LandingPageComponent,
    LoginPopupComponent,
    SignupPopupComponent,
    ApiManagementComponent,
    AnalyticsComponent,
    AlertsComponent,
    DashboardDataComponent,
    ResponseChartComponent,
    DashbaordChartsComponent,
    AlertDataComponent,
    DeleteConfirmationComponent,
    ConfirmDeleteAlertComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterOutlet,
    CommonModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatIconModule,
    OverlayModule,
    MatSelectModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
