import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {AppState} from './store/app.state';
import {selectUser} from './store/common/common.state';

@Injectable()
export class AuthGuard implements CanActivate {

  public static lastRoute = '';

  constructor(private router: Router, private store: Store<AppState>) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store.select(selectUser).pipe(
      map(user => !!user),
      tap(authenticated => {

        if (!authenticated) {
          AuthGuard.lastRoute = state.url;
          this.router.navigate(['auth']);
        }
      }),
    );
  }
}
