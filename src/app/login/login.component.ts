import { Component } from "@angular/core";

import { LoginFormsComponent } from "../login-forms/login-forms.component";
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
@Component({
  selector: "ns-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  constructor(private http: HttpClient) {}
  token: any;
  onTap() {
    console.log("Google here i Come");
  }
  googleSignin() {
    const signInOptions: GoogleSignInOptions = {
      ServerClientId:
        "1017943398721-b9fv6hvs30iec23odh6sc9je81a5nah1.apps.googleusercontent.com",
      SignInType: GoogleSignInType.Local,
      ForceAccountSelection: true,
    };

    // Please note that result can also be a failure result.
    // The actual result is in the object.
    startGoogleSignIn(signInOptions).then((result) => {
      console.log("Google sign in result: ", result);
      this.http
        .post("https://backendwithlogin-1-u7980985.deta.app/users/glogin", {
          result,
        })
        .pipe(
          map((res: any) => {
            console.log(res);
            const token = res["token"];
            if (token) {
              this.token = token;
              console.log(token);
              return true; // Palauta true, kun token on saatavilla
            } else {
              console.log("Pieleen meni");
              return false;
            } // Palauta false, jos tokenia ei löydy
          })
        );
    });
  }
}
