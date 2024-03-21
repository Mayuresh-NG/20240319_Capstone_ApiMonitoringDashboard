import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterOutlet } from '@angular/router';
import { DashboardComponent } from './PAGES/dashboard/dashboard.component';
import { LandingPageComponent } from './PAGES/landing-page/landing-page.component';
import { LoginPopupComponent } from './COMPONENTS/login-popup/login-popup.component';
import { SignupPopupComponent } from './COMPONENTS/signup-popup/signup-popup.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { ApiManagementComponent } from './COMPONENTS/api-management/api-management.component';
import { AnalyticsComponent } from './COMPONENTS/analytics/analytics.component';
import { AlertsComponent } from './COMPONENTS/alerts/alerts.component';
import { DashboardDataComponent } from './COMPONENTS/dashboard-data/dashboard-data.component';

import { OverlayModule } from '@angular/cdk/overlay';
import { MatSelectModule } from '@angular/material/select';

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
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
