import { Component } from "@angular/core";
import { SecureStorage } from "@nativescript/secure-storage";
import { Observable } from "rxjs";
import { logout } from "../auth.actions";
import { Dialogs } from "@nativescript/core";
import { Store } from "@ngrx/store";
import { RouterExtensions } from "@nativescript/angular";
import { updateDistance } from "../filter.actions";
import { getDistance } from "../filter.selectors";
import { AuthState } from "../auth.reducer";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { TextField } from "@nativescript/core";
import { AuthService } from "../auth.service";
import { Location } from "@angular/common";
import { Router } from "@angular/router";
const secureStorage = new SecureStorage();
@Component({
  selector: "ns-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.css"],
})
export class SettingsComponent {
  isPressed = false;
  user: boolean = false;
  showdistance: boolean = false;
  distance: number;
  email: any;
  confirmtext: string;
  text: string;
  userid: string;
  token: string;
  error: boolean = false;
  delete: boolean = false;
  firstname: string;
  lastname: string;
  constructor(
    private store: Store<{ AppState: AuthState }>,
    private routerExtensions: RouterExtensions,
    private authService: AuthService,
    private location: Location,
    private router: Router
  ) {
    this.store
      .select(getDistance)
      .subscribe((distance) => (this.distance = distance));
    try {
      secureStorage
        .get({
          key: "token",
        })
        .then((res) => {
          this.token = res;
        });
      console.log(this.token);
    } catch (error) {
      console.error("Error retrieving token from secure storage:", error);
      return; // Keskeytä suoritusvirheen tapauksessa
    }
    try {
      secureStorage
        .get({
          key: "id",
        })
        .then((res) => {
          this.userid = res;
        });
      console.log(this.email);
    } catch (error) {
      console.error("Error retrieving token from secure storage:", error);
      return; // Keskeytä suoritusvirheen tapauksessa
    }
    try {
      secureStorage
        .get({
          key: "etunimi",
        })
        .then((res) => {
          this.firstname = res;
        });
      console.log(this.email);
    } catch (error) {
      console.error("Error retrieving token from secure storage:", error);
      return; // Keskeytä suoritusvirheen tapauksessa
    }
    try {
      secureStorage
        .get({
          key: "sukunimi",
        })
        .then((res) => {
          this.lastname = res;
        });
      console.log(this.email);
    } catch (error) {
      console.error("Error retrieving token from secure storage:", error);
      return; // Keskeytä suoritusvirheen tapauksessa
    }
    try {
      secureStorage
        .get({
          key: "sposti",
        })
        .then((res) => {
          this.email = res;
          this.confirmtext = "Delete" + res;
        });
      console.log(this.email);
    } catch (error) {
      console.error("Error retrieving token from secure storage:", error);
      return; // Keskeytä suoritusvirheen tapauksessa
    }
  }

  onSliderChange(event: any) {
    this.distance = event.value;

    this.store.dispatch(updateDistance({ distance: this.distance }));
  }

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
      this.authService.logOut();
    }
  }

  onTextChange(args) {
    let textField = <TextField>args.object;
    this.text = textField.text;
  }
  toggleUser() {
    this.user = !this.user;
  }
  toggleDistance() {
    this.showdistance = !this.showdistance;
  }

  async deleteUser() {
    console.log(this.text);
    if (this.text === this.confirmtext) {
      console.log("oikein");
      const confirmResult = await Dialogs.confirm({
        title: "Confirm Logout",
        message: "Are you sure you want to delete your account?",
        okButtonText: "Yes",
        cancelButtonText: "Cancel",
      });

      if (confirmResult) {
        // User clicked "Yes" in the confirmation dialog
        // Perform logout actions
        this.authService
          .deleteUser(this.userid, this.token)
          .subscribe((res) => {
            console.log(res);
          });
        this.authService.logOut();
      }
    } else {
      console.log("väärin");
      this.error = true;
    }
  }
  toggleDelete() {
    this.delete = !this.delete;
  }

  goBack(): void {
    this.isPressed = !this.isPressed;
    setTimeout(() => {
      this.isPressed = false; // Aseta takaisin false
      this.location.back(); // Suorita reititys
    }, 200); // Aseta viive aikaan millisekunteina, esim. 3
  }

  routePrivacy() {
    this.router.navigate(["userprivacy"]);
  }
}
