import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {ActionTypes, SetDays, NewDay, DeleteDay, EditDay} from './data.actions';
import {Store} from '@ngrx/store';
import {AppState} from '../app.state';
import {selectUser} from '../common/common.state';

import {map, tap, switchMap, withLatestFrom} from 'rxjs/operators';
import {DayData} from '../../models/day-data';

@Injectable()
export class DataEffects {

  constructor(private actions$: Actions, private store: Store<AppState>, private afs: AngularFirestore) {}

  @Effect()
  loadDays$ = this.actions$.ofType(ActionTypes.LOAD_DAYS).pipe(
    withLatestFrom(this.store.select(selectUser)),
    map(([action, user]) => (user || {uid: ''}).uid),
    switchMap(uid => this.getCollection(uid).valueChanges().pipe(
      map(days => new SetDays({days})),
    ))
  );

  @Effect({dispatch: false})
  newDay$ = this.actions$.ofType<NewDay>(ActionTypes.NEW_DAY).pipe(
    withLatestFrom(this.store.select(selectUser)),
    map(([action, user]) => ({day: action.payload, uid: (user || {uid: ''}).uid})),
    tap(({day, uid}) => {
      this.getCollection(uid).doc<DayData>(day.id).set(day);
    })
  );

  @Effect({dispatch: false})
  editDay$ = this.actions$.ofType<EditDay>(ActionTypes.EDIT_DAY).pipe(
    withLatestFrom(this.store.select(selectUser)),
    map(([action, user]) => ({day: action.payload, uid: (user || {uid: ''}).uid})),
    tap(({day, uid}) => {
      this.getCollection(uid).doc<DayData>(day.id).update(day);
    })
  );

  @Effect({dispatch: false})
  deleteDay$ = this.actions$.ofType<DeleteDay>(ActionTypes.DELETE_DAY).pipe(
    withLatestFrom(this.store.select(selectUser)),
    map(([action, user]) => ({id: action.payload.id, uid: (user || {uid: ''}).uid})),
    tap(({id, uid}) => {
      this.getCollection(uid).doc<DayData>(id).delete();
    })
  );

  getCollection(uid: string): AngularFirestoreCollection<DayData> {
    return this.afs.doc(`user/${uid}`).collection<DayData>('days');
  }

}
