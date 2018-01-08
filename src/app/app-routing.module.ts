import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from './auth.guard';
import {TodayComponent} from './today/today/today.component';
import {OverviewComponent} from './overview/overview/overview.component';
import {SettingsComponent} from './settings/settings/settings.component';
import {AuthComponent} from './auth/auth/auth.component';
import {StatsComponent} from './stats/stats/stats.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/today',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'today',
    component: TodayComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'overview',
    component: OverviewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'stats',
    component: StatsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    component: AuthComponent
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
