import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TodayComponent} from './today/today/today.component';
import {OverviewComponent} from './overview/overview/overview.component';
import {SettingsComponent} from './settings/settings/settings.component';
import {AuthComponent} from './auth/auth/auth.component';
import {AuthGuard} from './auth.guard';

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
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    component: AuthComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
