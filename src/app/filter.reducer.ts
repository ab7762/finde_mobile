// app.reducer.ts
import { createReducer, on } from "@ngrx/store";
import * as filterActions from "./filter.actions";
import { filter } from "rxjs";

export interface FilterState {
  family: boolean;
  food: boolean;
  music: boolean;
  sports: boolean;
}
export const initialState: FilterState = {
  family: false,
  food: false,
  music: false,
  sports: false,
};

export const filterReducer = createReducer(
  initialState,
  on(filterActions.toggleFamily, (state) => ({
    ...state,
    family: !state.family,
  })),
  on(filterActions.toggleFood, (state) => ({ ...state, food: !state.food })),
  on(filterActions.toggleMusic, (state) => ({ ...state, music: !state.music })),
  on(filterActions.toggleSports, (state) => ({
    ...state,
    sports: !state.sports,
  }))
);
