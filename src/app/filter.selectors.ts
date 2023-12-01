import { createFeatureSelector, createSelector } from "@ngrx/store";
import { FilterState } from "./filter.reducer";

const selectFilterState = createFeatureSelector<FilterState>("filterState");

export const getFamily = createSelector(
  selectFilterState,
  (state) => state.family
);
export const getFood = createSelector(selectFilterState, (state) => state.food);
export const getMusic = createSelector(
  selectFilterState,
  (state) => state.music
);
export const getSports = createSelector(
  selectFilterState,
  (state) => state.sports
);
export const getDistance = createSelector(
  selectFilterState,
  (state) => state.distance
);
