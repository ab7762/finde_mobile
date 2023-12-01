import { createAction, props } from "@ngrx/store";

export const toggleFamily = createAction("[App] Toggle Family");
export const toggleFood = createAction("[App] Toggle Food");
export const toggleMusic = createAction("[App] Toggle Music");
export const toggleSports = createAction("[App] Toggle Sports");
export const updateDistance = createAction(
  "[Filter] Update Distance",
  props<{ distance: number }>()
);
