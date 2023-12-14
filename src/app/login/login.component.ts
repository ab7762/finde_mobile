import { Component } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { RouterExtensions } from "@nativescript/angular";
import { LoginFormsComponent } from "../login-forms/login-forms.component";
import { Store } from "@ngrx/store";
import { Router } from "@angular/router";
import { AuthState } from "../auth.reducer";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";

import {
  GoogleSignInOptions,
  GoogleSignInType,
  startGoogleSignIn,
} from "@klippa/nativescript-login";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import {
  wireInGoogleSignIn,
  wireInFacebookLogin,
} from "@klippa/nativescript-login";
import { login } from "../auth.actions";
import { SecureStorage } from "@nativescript/secure-storage";
const secureStorage = new SecureStorage();
@Component({
  selector: "ns-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  loading: boolean = false;

  constructor(
    private http: HttpClient,
    private store: Store<{ appState: AuthState }>,
    private router: Router,
    private routerExtensions: RouterExtensions
  ) {}
  token: any;

  private jwtHelp = new JwtHelperService();

  // Google-kirjautumisen funktio. Kun googlelta saadaan tiedot onnistuneesti, lähetetään googlen tiedot backend-
  // sovellukseen, joka palauttaa jwt-tokenin. Muutetaan myös tila, jotta voidaan siirtyä suojatulle sivulle.
  async googleSignin() {
    const signInOptions: GoogleSignInOptions = {
      SignInType: GoogleSignInType.Local,
      ForceAccountSelection: true,
      RequestEmail: true,
      ServerClientId:
        "1017943398721-7m10k9gvg9hjv9osttgihpcld0p03jg9.apps.googleusercontent.com",
      RequestIdToken: true,
    };

    // Please note that result can also be a failure result.
    // The actual result is in the object.
    startGoogleSignIn(signInOptions)
      .then((result) => {
        this.loading = true;
        console.log("Google sign in result: ", result);
        if (result.ResultType == 0) {
          this.loading = false;
        }
        return this.http
          .post("https://backendwithlogin-1-u7980985.deta.app/users/glogin", {
            gtoken: result.IdToken,
          })
          .pipe(
            map((res: any) => {
              console.log("Tässä vastaus", res);
              const token = res["token"];

              if (token) {
                this.token = token;
                const payload = this.jwtHelp.decodeToken(token);
                console.log(token);
                console.log("Tässä googlen jälkeen payload", payload);
                secureStorage
                  .set({
                    key: "token",
                    value: token,
                  })
                  .then((success) =>
                    console.log("Successfully set a value? " + success)
                  );
                secureStorage
                  .set({
                    key: "id",
                    value: payload._id,
                  })
                  .then((success) =>
                    console.log("Successfully set a value? " + success)
                  );
                secureStorage
                  .set({
                    key: "sposti",
                    value: payload.sposti,
                  })
                  .then((success) =>
                    console.log("Successfully set a value? " + success)
                  )
                  .catch((error) => {
                    console.error("Error setting sposti value:", error);
                  });
                this.store.dispatch(login());
                this.wait(5000);
                this.loading = false;
                this.routerExtensions.navigate(["/bottom-nav"], {
                  clearHistory: true,
                });

                return true; // Palauta true, kun token on saatavilla
              }
              if (res.ok === false) {
                console.log("Pieleen meni");
                this.loading = false;

                return false;
              } // Palauta false, jos tokenia ei löydy
            })
          )
          .subscribe(
            (res) => {
              console.log(res);
            },
            (error) => {
              console.error("HTTP-virhe: ", error);
              this.loading = false;
            }
          );
      })
      .catch((error) => {
        console.error("Google-kirjautumisen virhe: ", error);
        this.loading = false;
      });
  }

  async wait(ms: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
}
