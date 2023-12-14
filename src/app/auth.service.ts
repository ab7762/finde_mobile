import { Injectable, ViewContainerRef } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map, filter } from "rxjs/operators";
import { catchError } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";
import { RouterExtensions } from "@nativescript/angular";
import { Store } from "@ngrx/store";
import { AuthState } from "./auth.reducer";
import { login, logout } from "./auth.actions";
import { Router } from "@angular/router";
import { selectIsLoggedIn } from "./auth.selectors";
import { ModalDialogService, ModalDialogOptions } from "@nativescript/angular";
import { ModalComponent } from "./modal/modal.component";
import { ExtendedShowModalOptions } from "nativescript-windowed-modal";
import { SecureStorage } from "@nativescript/secure-storage";
import { User } from "./user";
const secureStorage = new SecureStorage();
@Injectable({
  providedIn: "root",
})
export class AuthService {
  url: string = "https://backendwithlogin-1-u7980985.deta.app/users/login";
  url2: string = "https://d17e239b9ewh66.cloudfront.net/users/register";
  url3: string = "https://backendwithlogin-1-u7980985.deta.app/users";
  text1: string =
    "Confirmation message sent to your email. Click the link to log in.";
  text2: string = "Login successful. Welcome to use the Finde app!";
  isLoggedIn: boolean;
  public token: string;
  private jwtHelp = new JwtHelperService();
  constructor(
    private http: HttpClient,
    private store: Store<{ appState: AuthState }>,
    private router: Router,
    private modalService: ModalDialogService,
    private routerExtensions: RouterExtensions
  ) {
    this.store.select(selectIsLoggedIn).subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn; // Aseta loggedIn arvo serviceen muuttujaan
    });
  }

  // Sisäänkirjautuminen. Onnistuessa asetetaan arvot securestorageen ja siirrytään bottom-nav komponentille.
  logIn(email: string, password: string): Observable<boolean> {
    console.log("Terve");
    return this.http.post(this.url, { sposti: email, salasana: password }).pipe(
      map((res: any) => {
        const token = res["token"];
        if (token) {
          this.token = token;
          const payload = this.jwtHelp.decodeToken(token);
          console.log(payload);
          if (payload.sposti === email) {
            console.log("Payload sposti:", payload.sposti);
            const sapo = payload.sposti;
            console.log(sapo);
            secureStorage
              .set({
                key: "sukunimi",
                value: payload.sukunimi,
              })
              .then((success) =>
                console.log("Successfully set a value? " + success)
              )
              .catch((error) => {
                console.error("Error setting sposti value:", error);
              });
            secureStorage
              .set({
                key: "etunimi",
                value: payload.etunimi,
              })
              .then((success) =>
                console.log("Successfully set a value? " + success)
              )
              .catch((error) => {
                console.error("Error setting sposti value:", error);
              });
            secureStorage
              .set({
                key: "sposti",
                value: sapo,
              })
              .then((success) =>
                console.log("Successfully set a value? " + success)
              )
              .catch((error) => {
                console.error("Error setting sposti value:", error);
              });
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
          }
          this.store.dispatch(login());
          this.openModal1(this.text2);

          this.routerExtensions.navigate(["/bottom-nav"], {
            clearHistory: true,
          });
          return true; // Palauta true, kun token on saatavilla
        } else {
          this.store
            .select((state) => state)
            .subscribe((appState) => {
              console.log("loggedIn:", appState.appState.loggedIn);
            });
          this.openModal1(res.message);

          return false;
        } // Palauta false, jos tokenia ei löydy
      }),
      catchError((error) => {
        alert(error.message);
        return of(false); // Palauta false virhetilanteessa
      })
    );
  }
  // Rekisteröityminen. Onnistuessa palautetaan modal, jossa ilmoitetaan, että sähköpostiin on lähtenyt
  // vahvistusviesti.
  signUp(
    firstname: string,
    lastname: string,
    email: string,
    password: string
  ): Observable<boolean> {
    console.log("Terve");
    return this.http
      .post(this.url2, {
        etunimi: firstname,
        sukunimi: lastname,
        sposti: email,
        salasana: password,
      })
      .pipe(
        map((res: any) => {
          console.log(res);
          this.openModal1(this.text1);
          this.router.navigate(["login"]);
          return true; // Palauta true, kun rekisteröinti onnistui
        }),
        catchError((error) => {
          this.openModal1(error.error.message);
          console.log(error);
          return of(false); // Palauta false virhetilanteessa
        })
      );
  }
  async openModal1(text) {
    const options: ModalDialogOptions = {
      context: { text },
      fullscreen: true,
    };

    const result = await this.modalService.showModal(ModalComponent, options);

    console.log("Modal response:", result);
  }

  // Käyttäjän poistaminen id: perusteella.
  deleteUser(userid, token): Observable<User> {
    const url = `${this.url3}/${userid}`;
    const headers = {
      "x-access-token": token,
      // Lisää muita otsikoita tarvittaessa
    };
    return this.http.delete<User>(url, { headers: headers });
  }
  // Uloskirjautuminen. Tyhjennetään securestorage, kirjaudutaan ulos ja siirrytään aloitusnäkymään.
  async logOut() {
    this.store.dispatch(logout());

    await this.clearSecureStorage();

    this.routerExtensions.navigate(["start"], {
      clearHistory: true,
      transition: {
        name: "fade",
      },
    });
  }
  // Securestoragen tyhjennys
  private async clearSecureStorage() {
    secureStorage
      .removeAll()
      .then((success) =>
        console.log("Successfully removed a value? " + success)
      );
  }
}
