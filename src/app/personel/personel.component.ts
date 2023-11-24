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
    private authstore: Store<{ AppState: AuthState }>,
    private routerExtensions: RouterExtensions
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
  async logOut() {
    const confirmResult = await Dialogs.confirm({
      title: "Confirm Logout",
      message: "Are you sure you want to log out?",
      okButtonText: "Yes",
      cancelButtonText: "Cancel",
    });

    if (confirmResult) {
      // User clicked "Yes" in the confirmation dialog
      // Perform logout actions

      // 1. Dispatch the logout action to the store
      this.store.dispatch(logout());

      // 2. Clear secure storage
      await this.clearSecureStorage();

      // 3. Navigate to the "start" view
      this.routerExtensions.navigate(["start"], {
        clearHistory: true,
        transition: {
          name: "fade",
        },
      });
    }
  }

  private async clearSecureStorage() {
    try {
      await secureStorage.remove({
        key: "token",
      });
      await secureStorage.remove({
        key: "id",
      });
    } catch (error) {
      console.error("Error clearing secure storage:", error);
    }
  }
}
