import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  url: string = "https://backendwithlogin-1-u7980985.deta.app/users/login";
  url2: string = "https://backendwithlogin-1-u7980985.deta.app/users/register";
  public token: string;
  constructor(private http: HttpClient) {}
  logIn(email: string, password: string): Observable<boolean> {
    console.log("Terve");
    return this.http.post(this.url, { sposti: email, salasana: password }).pipe(
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
