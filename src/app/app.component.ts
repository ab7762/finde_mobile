import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SecureStorage } from "@nativescript/secure-storage";
import { Store } from "@ngrx/store";
import { AuthState } from "./auth.reducer";
import { login, logout } from "./auth.actions";
const secureStorage = new SecureStorage();
@Component({
  selector: "ns-app",
  templateUrl: "./app.component.html",
})
export class AppComponent {
  constructor(
    private router: Router,
    private store: Store<{ appState: AuthState }>
  ) {}
  ngOnInit() {
    // Tarkista SecureStoragessa olevat tiedot käynnistyessä

    const storedId = secureStorage.getSync({ key: "id" });
    const storedToken = secureStorage.getSync({ key: "token" });

    // Jos id ja token löytyvät, siirry suoraan sisäänkirjautumiseen
    if (storedId && storedToken) {
      this.store.dispatch(login());
      this.router.navigate(["/bottom-nav"]); // Muuta reitti tarpeen mukaan
    }
  }
}
