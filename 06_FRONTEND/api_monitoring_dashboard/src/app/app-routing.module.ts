import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './PAGES/dashboard/dashboard.component';
import { LandingPageComponent } from './PAGES/landing-page/landing-page.component';
import { AuthGuard } from './CORE/guard/auth.guard';
import { ApiManagementComponent } from './COMPONENTS/api-management/api-management.component';
import { AnalyticsComponent } from './COMPONENTS/analytics/analytics.component';
import { AlertsComponent } from './COMPONENTS/alerts/alerts.component';
import { DashboardDataComponent } from './COMPONENTS/dashboard-data/dashboard-data.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // Redirect to dashboard if logged in
  { path: 'landing', component: LandingPageComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard-data', component: DashboardDataComponent },
      { path: 'apimanager', component: ApiManagementComponent },
      { path: 'analytics', component: AnalyticsComponent },
      { path: 'alerts', component: AlertsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
