import { Component, OnInit, OnDestroy } from "@angular/core";
import { registerElement } from "@nativescript/angular";
import { EventService } from "../event.service";
import { interval, Subscription } from "rxjs";

import { Router } from "@angular/router";
registerElement(
  "Mapbox",
  () => require("@nativescript-community/ui-mapbox").MapboxView
);

@Component({
  selector: "ns-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"],
})
export class MapComponent implements OnInit, OnDestroy {
  events: any;
  mapUpdateInterval = 5000; // 1 minuutin välein (ms)
  mapUpdateSubscription: Subscription;

  constructor(private eventService: EventService, private router: Router) {}

  ngOnInit() {
    this.loadEventsAndRefreshMap(); // Alusta komponentti ja lisää markkerit kartalle

    // Aseta aikavälin mukainen päivitys
    this.mapUpdateSubscription = interval(this.mapUpdateInterval).subscribe(
      () => {
        this.reloadComponent();
      }
    );
  }
  reloadComponent() {
    this.router.navigate(["bottom-nav"]);
  }
  ngOnDestroy() {
    if (this.mapUpdateSubscription) {
      this.mapUpdateSubscription.unsubscribe();
    }
  }

  loadEventsAndRefreshMap() {
    this.eventService.getEvents().subscribe((response) => {
      this.events = response;
      console.log("Tiedot päivitetty kartalle:", this.events);
      // Kutsu onMapReady päivitettävien tietojen kanssa
    });
  }

  onMapReady(args): void {
    console.log("map is ready");
    const markers = [];

    this.events.forEach((event) => {
      markers.push({
        lat: event.sijainti[0].long,
        lng: event.sijainti[0].lat,
        title: event.nimi,
        subtitle: event.kuvaus,
        selected: false,
        onCalloutTap: () => {
          console.log("Marker callout tapped");
        },
      });
    });

    // Lisää markkerit kartalle
    args.map.addMarkers(markers);
  }
}
