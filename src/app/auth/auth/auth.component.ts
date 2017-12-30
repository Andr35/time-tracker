import {Component, OnInit, ChangeDetectionStrategy, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import {Subscription} from 'rxjs/Subscription';
import {filter} from 'rxjs/operators/filter';

import * as firebase from 'firebase/app';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent implements OnInit, OnDestroy {

  private subscr: Subscription;

  constructor(private router: Router, private afAuth: AngularFireAuth) {}

  ngOnInit() {
    this.subscr = this.afAuth.authState.pipe(filter(user => !!user)).subscribe(user => {
      this.router.navigate(['/']);
    });
  }

  onAuth() {
    if (firebase.auth) {
      this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }
  }

  ngOnDestroy() {
    this.subscr.unsubscribe();
  }
}
