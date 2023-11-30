import { Component } from "@angular/core";
import { SecureStorage } from "@nativescript/secure-storage";
import { Observable } from "rxjs";
import { logout } from "../auth.actions";
import { Dialogs } from "@nativescript/core";
import { Store } from "@ngrx/store";
import { RouterExtensions } from "@nativescript/angular";

import { AuthState } from "../auth.reducer";
const secureStorage = new SecureStorage();
@Component({
  selector: "ns-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.css"],
})
export class SettingsComponent {
  constructor(
    private store: Store<{ AppState: AuthState }>,
    private routerExtensions: RouterExtensions
  ) {}
  async signOut() {
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
