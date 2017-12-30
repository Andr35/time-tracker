import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {ActionTypes, SetDays, StartDay, AddPause, StopDay, DeleteDay, DeletePause} from './data.actions';
import {Store} from '@ngrx/store';
import {AppState} from '../app.state';
import {selectUser} from '../common/common.state';

import {map} from 'rxjs/operators/map';
import {tap} from 'rxjs/operators/tap';
import {first} from 'rxjs/operators/first';
import {switchMap} from 'rxjs/operators/switchMap';
import {withLatestFrom} from 'rxjs/operators/withLatestFrom';
import {DayData} from '../../models/day-data';

@Injectable()
export class DataEffects {

  constructor(private actions$: Actions, private store: Store<AppState>, private afs: AngularFirestore) {}

  @Effect()
  loadDays$ = this.actions$.ofType(ActionTypes.LOAD_DAYS).pipe(
    withLatestFrom(this.store.select(selectUser)),
    map(([action, user]) => (user || {uid: ''}).uid),
    switchMap(uid => this.getCollection(uid).valueChanges().pipe(
      map(days => new SetDays({days}))
    ))
  );

  @Effect({dispatch: false})
  startDay$ = this.actions$.ofType<StartDay>(ActionTypes.START_DAY).pipe(
    withLatestFrom(this.store.select(selectUser)),
    map(([action, user]) => ({startDate: action.payload.startDate, uid: (user || {uid: ''}).uid})),
    tap(({startDate, uid}) => {
      this.getCollection(uid).doc(`${startDate.getTime()}`).set({startDate, pauses: []});
    })
  );

  @Effect({dispatch: false})
  addPause$ = this.actions$.ofType<AddPause>(ActionTypes.ADD_PAUSE).pipe(
    withLatestFrom(this.store.select(selectUser)),
    map(([action, user]) => ({id: action.payload.id, pause: action.payload.pause, uid: (user || {uid: ''}).uid})),
    tap(({id, pause, uid}) => {
      // TODO better
      // TODO works?
      this.getCollection(uid).doc<DayData>(`${id}`).valueChanges().pipe(first()).subscribe(doc => {
        this.getCollection(uid).doc<DayData>(`${id}`).update({pauses: [...doc.pauses, pause]});
      });
    })
  );

  @Effect({dispatch: false})
  stopDay$ = this.actions$.ofType<StopDay>(ActionTypes.STOP_DAY).pipe(
    withLatestFrom(this.store.select(selectUser)),
    map(([action, user]) => ({id: action.payload.id, stopDate: action.payload.stopDate, uid: (user || {uid: ''}).uid})),
    tap(({id, stopDate, uid}) => {
      this.getCollection(uid).doc<DayData>(`${id}`).update({stopDate});
    })
  );

  @Effect({dispatch: false})
  deleteDay$ = this.actions$.ofType<DeleteDay>(ActionTypes.DELETE_DAY).pipe(
    withLatestFrom(this.store.select(selectUser)),
    map(([action, user]) => ({id: action.payload.id, uid: (user || {uid: ''}).uid})),
    tap(({id, uid}) => {
      this.getCollection(uid).doc<DayData>(`${id}`).delete();
    })
  );

  @Effect({dispatch: false})
  deletePause$ = this.actions$.ofType<DeletePause>(ActionTypes.DELETE_PAUSE).pipe(
    withLatestFrom(this.store.select(selectUser)),
    map(([action, user]) => ({id: action.payload.id, index: action.payload.index, uid: (user || {uid: ''}).uid})),
    tap(({id, index, uid}) => {
      // TODO better
      // TODO works?
      this.getCollection(uid).doc<DayData>(`${id}`).valueChanges().pipe(first()).subscribe(doc => {
        this.getCollection(uid).doc<DayData>(`${id}`).update({pauses: doc.pauses.filter((p, i) => i !== index)});
      });
    })
  );

  getCollection(uid: string): AngularFirestoreCollection<DayData> {
    return this.afs.doc(`user/${uid}`).collection<DayData>('days');
  }

}
