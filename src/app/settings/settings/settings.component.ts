import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent implements OnInit {

  constructor(private afAuth: AngularFireAuth) {}

  ngOnInit() {
  }

  onLogout() {
    this.afAuth.auth.signOut();
  }

}
