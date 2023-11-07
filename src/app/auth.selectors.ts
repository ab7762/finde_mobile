//Selectorit, joilla voidaan hakea storen tietoja komponenteille.

import { createSelector, createFeatureSelector } from "@ngrx/store";
import { AuthState } from "./auth.reducer";

// Luo valitsija
const selectAuthState = createFeatureSelector<AuthState>("auth");
export const selectIsLoggedIn = createSelector(
  selectAuthState,
  (state: AuthState) => state.loggedIn
);
