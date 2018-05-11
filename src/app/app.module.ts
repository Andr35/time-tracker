import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule, ErrorHandler} from '@angular/core';

import {StoreModule} from './store/store.module';

import {FlexLayoutModule} from '@angular/flex-layout';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';

import {AppRoutingModule} from './app-routing.module';

import {ServiceWorkerModule} from '@angular/service-worker';
import {AppComponent} from './app.component';

import {environment} from '../environments/environment';

import {TodayModule} from './today/today.module';
import {OverviewModule} from './overview/overview.module';
import {StatsModule} from './stats/stats.module';
import {EditModule} from './edit/edit.module';
import {SettingsModule} from './settings/settings.module';
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AuthModule} from './auth/auth.module';
import {AuthGuard} from './auth.guard';

import * as Raven from 'raven-js';

Raven.config(environment.sentry_dsn, {
  release: '1.0.0',
  environment: environment.production ? 'development' : 'production'
});

if (environment.production) {
  Raven.install();
}

export class RavenErrorHandler implements ErrorHandler {
  handleError(err: any): void {
    console.log(err);
    Raven.captureException(err);
    Raven.showReportDialog();
  }
}
export class SimpleErrorHandler implements ErrorHandler {
  handleError(err: any): void {
    console.log(err);
  }
}

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
    BrowserAnimationsModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule.enablePersistence(),

    StoreModule.forRoot(),

    TodayModule,
    OverviewModule,
    StatsModule,
    SettingsModule,
    AuthModule,
    EditModule,

    // Style
    FlexLayoutModule,
    MatTabsModule,
    MatIconModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    AuthGuard,
    environment.production ? {provide: ErrorHandler, useClass: RavenErrorHandler} : []
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
