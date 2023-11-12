import { Component, OnInit, OnDestroy } from "@angular/core";
import { EventService } from "../event.service";
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import { filter, switchMap, takeUntil } from "rxjs/operators";
import { interval, Subject } from "rxjs";
import { LocationService } from "../location.service";

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
  constructor(
    private Eventservice: EventService,
    private locationService: LocationService
  ) {}
  // Alustetaan komponentti ja haetaan tapahtumat. Jos lataus kestää, asetetaan latausikoni näytölle. Suoritetaan loadevents
  // tapahtuma minuutin välein ja päivitetään uusi tilanne näytölle.
  ngOnInit() {
    this.loadEvents(); // Lataa aluksi tapahtumat

    // Päivitä tapahtumat 5 minuutin välein
    interval(300000) // 300000 ms = 5 minuuttia
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
    });
  }
}
