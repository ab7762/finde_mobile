import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { FilterState } from "../filter.reducer";
import { AuthState } from "../auth.reducer";
import { Dialogs } from "@nativescript/core";
import { RouterExtensions } from "@nativescript/angular";
import { SecureStorage } from "@nativescript/secure-storage";
import { Observable } from "rxjs";
import { logout } from "../auth.actions";
import {
  toggleMusic,
  toggleFamily,
  toggleFood,
  toggleSports,
} from "../filter.actions";
import { getFamily, getMusic, getFood, getSports } from "../filter.selectors";
import { Router, RouterLink } from "@angular/router";

const secureStorage = new SecureStorage();
@Component({
  selector: "ns-personel",
  templateUrl: "./personel.component.html",
  styleUrls: ["./personel.component.css"],
})
export class PersonelComponent {
  music: Boolean;
  family: boolean;
  food: boolean;
  sports: boolean;
  // Haetaan storesta muuttujiin arvot
  constructor(
    private store: Store<{ AppState: FilterState }>,

    private routerExtensions: RouterExtensions,
    private router: Router
  ) {
    this.store.select(getMusic).subscribe((music) => {
      this.music = music;
    });
    this.store.select(getFamily).subscribe((family) => {
      this.family = family;
    });
    this.store.select(getFood).subscribe((food) => {
      this.food = food;
    });
    this.store.select(getSports).subscribe((sports) => {
      this.sports = sports;
    });
  }

  toggleMusic() {
    this.store.dispatch(toggleMusic());
    this.store.select(getMusic).subscribe((music) => {
      console.log("Music Value:", music);
    });
  }
  toggleFamily() {
    this.store.dispatch(toggleFamily());
    this.store.select(getFamily).subscribe((family) => {
      console.log("Family Value:", family);
    });
  }
  toggleFood() {
    this.store.dispatch(toggleFood());
    this.store.select(getFood).subscribe((food) => {
      console.log("Food Value:", food);
    });
  }
  toggleSports() {
    this.store.dispatch(toggleSports());
    this.store.select(getSports).subscribe((sports) => {
      console.log("Sports Value:", sports);
    });
  }

  routeSettings() {
    this.router.navigate(["settings"]);
  }
}
