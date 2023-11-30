import { Injectable, ViewContainerRef } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map, filter } from "rxjs/operators";
import { catchError } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";
import { SecureStorage } from "@nativescript/secure-storage";
import { Store } from "@ngrx/store";
import { AuthState } from "./auth.reducer";
import { login, logout } from "./auth.actions";
import { Router } from "@angular/router";
import { selectIsLoggedIn } from "./auth.selectors";
import { ModalDialogService, ModalDialogOptions } from "@nativescript/angular";
import { ModalComponent } from "./modal/modal.component";
import { ExtendedShowModalOptions } from "nativescript-windowed-modal";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private secureStorage: SecureStorage;
  url: string = "https://backendwithlogin-1-u7980985.deta.app/users/login";
  url2: string = "https://d17e239b9ewh66.cloudfront.net/users/register";
  text1: string =
    "Vahvistusviesti lähetetty sähköpostiin. Klikkaa linkkiä niin voit kirjautua.";
  isLoggedIn: boolean;
  public token: string;
  private jwtHelp = new JwtHelperService();
  constructor(
    private http: HttpClient,
    private store: Store<{ appState: AuthState }>,
    private router: Router,
    private modalService: ModalDialogService
  ) {
    this.secureStorage = new SecureStorage();
    this.store.select(selectIsLoggedIn).subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn; // Aseta loggedIn arvo serviceen muuttujaan
    });
  }

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
            this.secureStorage
              .set({
                key: "token",
                value: token,
              })
              .then((suc) => {
                console.log("Done", suc);
              });
          }
          this.store.dispatch(login());
          console.log(this.isLoggedIn);
          alert("Login succesful! Welcome");
          this.router.navigate(["bottom-nav"]);
          return true; // Palauta true, kun token on saatavilla
        } else {
          this.store
            .select((state) => state)
            .subscribe((appState) => {
              console.log("loggedIn:", appState.appState.loggedIn);
            });
          alert(res.message);
          return false;
        } // Palauta false, jos tokenia ei löydy
      }),
      catchError((error) => {
        alert(error.message);
        return of(false); // Palauta false virhetilanteessa
      })
    );
  }

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
}
