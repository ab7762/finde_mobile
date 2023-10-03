import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { catchError } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";
import { SecureStorage } from "@nativescript/secure-storage";
import { Store } from "@ngrx/store";
import { AuthState } from "./auth.reducer";
import { login, logout } from "./auth.actions";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private secureStorage: SecureStorage;
  url: string = "https://backendwithlogin-1-u7980985.deta.app/users/login";
  url2: string = "https://backendwithlogin-1-u7980985.deta.app/users/register";
  loggedIn$: Observable<boolean>;
  public token: string;
  private jwtHelp = new JwtHelperService();
  constructor(private http: HttpClient, private store: Store<AuthState>) {
    this.secureStorage = new SecureStorage();
    this.loggedIn$ = this.store.select((state) => state.loggedIn);
  }
  logIn(email: string, password: string): Observable<boolean> {
    console.log("Terve");
    return this.http.post(this.url, { sposti: email, salasana: password }).pipe(
      map((res: any) => {
        console.log(res);
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
          this.store.subscribe((s) => {
            console.log("Kirjautumistila:", s);
          });
          return true; // Palauta true, kun token on saatavilla
        } else {
          this.store.subscribe((s) => {
            console.log("Kirjautumistila:", s);
          });
          return false;
        } // Palauta false, jos tokenia ei löydy
      }),
      catchError((error) => {
        console.error("Virhe kirjautumisessa:", error);
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
          const token = res["token"];
          if (token) {
            this.token = token;
            console.log(token);
            return true; // Palauta true, kun token on saatavilla
          } else {
            console.log(res.json.message);
            return false;
          } // Palauta false, jos tokenia ei löydy
        }),
        catchError((error) => {
          console.error("Virhe kirjautumisessa:", error.error.message);
          return of(false); // Palauta false virhetilanteessa
        })
      );
  }
}
