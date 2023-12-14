//Reittivahti , joka suojaa reitit kunnes sisäänkirjautuminen on true

import { CanActivateFn, Router } from "@angular/router";
import { Injectable, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { AuthState } from "./auth.reducer";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
@Injectable({
  providedIn: "root",
})
class PermissionsService {
  tila: boolean;
  constructor(
    private router: Router,
    private store: Store<{ appState: AuthState }>
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    this.store
      .select((state) => state)
      .subscribe((appState) => {
        this.tila = appState.appState.loggedIn;
      });
    if (this.tila === true) {
      return true;
    } else {
      return false;
    }
  }
}
export const AuthGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean => {
  return inject(PermissionsService).canActivate(next, state);
};
