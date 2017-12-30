import {Injectable} from '@angular/core';

@Injectable()
export class CommonEffects {

  // @Effect()
  // loadToken$ = this.actions$.ofType(ActionTypes.LOAD_TOKEN)
  //   // Get the trec token from storage and set it into store
  //   .mergeMap(() => {
  //     const token = this.tokenService.getSavedToken();
  //     if (token) { // If token exists, check if is valid
  //       return this.sessionManagerService.istokenvalid(token)
  //         .map(res => new CActions.SetToken(token))
  //         .catch(() => [new CActions.RemoveToken(), new CActions.SetToken(null)]);
  //     } else { // No token -> Set null
  //       return of(new CActions.SetToken(null));
  //     }
  //   });

  // constructor(
  //   private actions$: Actions,
  // ) {}

}
