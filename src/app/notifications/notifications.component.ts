import { Component, OnInit, OnDestroy } from "@angular/core";
import { EventService } from "../event.service";
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import { filter, switchMap, takeUntil } from "rxjs/operators";
import { interval, Subject } from "rxjs";

@Component({
  selector: "ns-notifications",
  templateUrl: "./notifications.component.html",
  styleUrls: ["./notifications.component.css"],
})
export class NotificationsComponent implements OnInit {
  events: any;
  isLoading: boolean = true;
  imageUrl: string = "~/images/harrastukset.jpg";
  private destroy$ = new Subject<void>();
  constructor(private Eventservice: EventService) {}
  // Alustetaan komponentti ja haetaan tapahtumat. Jos lataus kestää, asetetaan latausikoni näytölle. Suoritetaan loadevents
  // tapahtuma minuutin välein ja päivitetään uusi tilanne näytölle.
  ngOnInit() {
    this.loadEvents(); // Lataa aluksi tapahtumat

    // Päivitä tapahtumat joka minuutti
    interval(10000) // 60000 ms = 1 minuutti
      .pipe(
        takeUntil(this.destroy$) // Lopettaa tilauksen komponentin tuhoutuessa
      )
      .subscribe(() => {
        this.loadEvents();
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadEvents() {
    this.Eventservice.getEvents().subscribe((res) => {
      this.events = res;
      this.isLoading = false;
      console.log("Tiedot päivitetty:", this.events);
    });
  }
}
