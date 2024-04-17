import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './PAGES/dashboard/dashboard.component';
import { LandingPageComponent } from './PAGES/landing-page/landing-page.component';
import { AuthGuard } from './CORE/guard/auth.guard';
import { ApiManagementComponent } from './COMPONENTS/API Management/api-management/api-management.component';
import { AnalyticsComponent } from './COMPONENTS/Performance Component/analytics/analytics.component';
import { AlertsComponent } from './COMPONENTS/Alert Component/alerts/alerts.component';
import { DashboardDataComponent } from './COMPONENTS/Analytics component/dashboard-data/dashboard-data.component';
import { NotFoundComponent } from './PAGES/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard/dashboard-data', pathMatch: 'full' },
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
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
