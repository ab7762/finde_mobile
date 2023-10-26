import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";

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
}
