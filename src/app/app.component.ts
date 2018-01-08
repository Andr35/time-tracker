import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';
import {Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import {Store} from '@ngrx/store';
import {AppState} from './store/app.state';
import {SetUser} from './store/common/common.actions';
import {LoadDays} from './store/data/data.actions';

import * as Raven from 'raven-js';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  readonly TABS: {label: string; link: string; icon: string}[];

  constructor(private router: Router, private store: Store<AppState>, private swUpdate: SwUpdate, private afAuth: AngularFireAuth) {

    // Init tabs
    this.TABS = [
      {label: 'Today', link: 'today', icon: 'today'},
      {label: 'Overview', link: 'overview', icon: 'update'},
      {label: 'Stats', link: 'stats', icon: 'insert_chart'},
      {label: 'Settings', link: 'settings', icon: 'settings'},
    ];
  }

  ngOnInit() {

    // Authentication updates /////////////////////////////////////////////////////////////////////
    this.afAuth.authState.subscribe(user => {
      this.store.dispatch(new SetUser(user));
      if (!user) {
        Raven.setUserContext({});
        this.router.navigate(['']);
      } else {
        Raven.setUserContext({
          id: user.uid,
          email: user.email || '',
          username: user.displayName || ''
        });
        this.store.dispatch(new LoadDays());
      }
    });

    // Service worker updates /////////////////////////////////////////////////////////////////////
    if (environment.production) {
      this.swUpdate.checkForUpdate();

      this.swUpdate.available.subscribe(() => {
        console.log(
          '%c A new version of the app is available. Reload the page to get it 🚀🚀🚀',
          'background: #eee; color: #2196F3; border: 1px solid #1565C0; font-size: 16px'
        );
      });
    }

  }
}

