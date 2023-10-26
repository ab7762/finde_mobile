import { Component } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { SecureStorage } from "@nativescript/secure-storage";
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
@Component({
  selector: "ns-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  constructor(
    private http: HttpClient,
    private store: Store<{ appState: AuthState }>,
    private router: Router
  ) {
    this.secureStorage = new SecureStorage();
  }
  token: any;
  private secureStorage: SecureStorage;
  private jwtHelp = new JwtHelperService();
  onTap() {
    console.log("Google here i Come");
  }
  googleSignin() {
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
    startGoogleSignIn(signInOptions).then((result) => {
      console.log("Google sign in result: ", result);

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
              console.log(token);
              this.store.dispatch(login());

              alert("Login succesfull! Welcome");
              this.router.navigate(["bottom-nav"]);
              return true; // Palauta true, kun token on saatavilla
            } else {
              console.log("Pieleen meni");
              return false;
            } // Palauta false, jos tokenia ei löydy
          })
        )
        .subscribe((res) => {
          console.log(res);
        });
    });
  }
}
