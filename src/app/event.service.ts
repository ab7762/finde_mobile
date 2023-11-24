import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { SecureStorage } from "@nativescript/secure-storage";
@Injectable({
  providedIn: "root",
})
export class EventService {
  private secureStorage: SecureStorage;
  constructor(private http: HttpClient) {
    this.secureStorage = new SecureStorage();
  }

  url: string = "https://backendwithlogin-1-u7980985.deta.app/events";
  url2: string = "https://backendwithlogin-1-u7980985.deta.app/users";
  getEvents(): Observable<any> {
    let data = this.http.get(this.url);
    return data;
  }

  getEvent(id: number): Observable<any> {
    const url = `${this.url}/${id}`;
    return this.http
      .get(url)
      .pipe(catchError(this.handleError(`getEvent id=${id}`)));
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // Tulostaa virheen konsoliin.
      // Lisää virheen tiedot viesteihin.
      return of(result as T);
    };
  }

  likeEvent(userid, eventid, token): Observable<any> {
    const url = `${this.url}/${userid}/${eventid}`;

    // Haetaan tallennettu arvo secureStoragesta

    const headers = {
      "x-access-token": token,
      // Lisää muita otsikoita tarvittaessa
    };

    // Tehdään HTTP-pyyntö käyttäen otsikoita
    return this.http.post(url, {}, { headers: headers });
  }
  getLikedEvents(userid) {
    return this.http.get(`${this.url2}/liked/${userid}`);
  }
}
