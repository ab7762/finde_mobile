import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { SecureStorage } from "@nativescript/secure-storage";
import { Event } from "./event";
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
  getEvents(): Observable<Event[]> {
    let data = this.http.get<Event[]>(this.url);
    return data;
  }
  // Haetaan yksi tapahtuma id:n perusteella.
  getEvent(id: string): Observable<Event> {
    const url = `${this.url}/${id}`;
    return this.http
      .get<Event>(url)
      .pipe(catchError(this.handleError<Event>(`getEvent id=${id}`)));
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // Tulostaa virheen konsoliin.
      // Lisää virheen tiedot viesteihin.
      return of(result as T);
    };
  }
  // Tykätään tapahtumasta. Käyttäjän id ja tapahtuman id löytävät oikean paikan tallentaa tieto
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
  // Haetaan tietyn käyttäjän tykätyt tapahtumat
  getLikedEvents(userid): Observable<Event> {
    return this.http.get<Event>(`${this.url2}/liked/${userid}`);
  }
  // Poistetaan tapahtuma käyttäjän tykätyt-taulukosta
  unlikeEvent(userid, eventid, token) {
    const url = `${this.url2}/${userid}/${eventid}`;
    const headers = {
      "x-access-token": token,
      // Lisää muita otsikoita tarvittaessa
    };
    return this.http.delete(url, { headers: headers });
  }
}
