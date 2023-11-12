import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class EventService {
  constructor(private http: HttpClient) {}

  url: string = "https://backendwithlogin-1-u7980985.deta.app/events";

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
}
