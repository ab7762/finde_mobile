import { Component, OnInit, OnDestroy, ChangeDetectorRef } from "@angular/core";
import { registerElement } from "@nativescript/angular";
import { EventService } from "../event.service";
import { interval, Subscription } from "rxjs";
import { LocationService } from "../location.service";
import { ImageSource } from "@nativescript/core/image-source";
import { Router, ActivatedRoute } from "@angular/router";
import { FilterState } from "../filter.reducer";
import { Store } from "@ngrx/store";
import { getFamily, getMusic, getFood, getSports } from "../filter.selectors";
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
  music: Boolean;
  family: boolean;
  food: boolean;
  sports: boolean;
  events: any;
  mapUpdateInterval = 5000; // 1 minuutin välein (ms)
  mapUpdateSubscription: Subscription;
  id: string;
  mapToken: string =
    "pk.eyJ1IjoibWlra28xOTg1IiwiYSI6ImNsbmlyazhqczA2N20yeHFvbGpxaHozOW4ifQ.GdqmP1CH2_dAOa40He98-Q";

  constructor(
    private eventService: EventService,
    private router: Router,
    public locationService: LocationService,
    private store: Store<{ AppState: FilterState }>,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {
    this.store.select(getMusic).subscribe((music) => {
      this.music = music;
    });
    this.store.select(getFamily).subscribe((family) => {
      this.family = family;
    });
    this.store.select(getFood).subscribe((food) => {
      this.food = food;
    });
    this.store.select(getSports).subscribe((sports) => {
      this.sports = sports;
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params["id"];
      console.log(this.id);
    });
    this.locationService.getLocation();
    this.loadEventsAndRefreshMap(); // Alusta komponentti ja lisää markkerit kartalle
    // Kuuntele filtterimuutoksia
    // Alusta komponentti ja lisää markkerit kartalle

    // Aseta aikavälin mukainen päivitys
  }

  ngOnDestroy() {
    if (this.mapUpdateSubscription) {
      this.mapUpdateSubscription.unsubscribe();
    }
  }

  loadEventsAndRefreshMap() {
    this.eventService.getEvents().subscribe((response) => {
      this.events = response;
      this.filterEvents();

      this.cdr.detectChanges();

      console.log("Tiedot päivitetty kartalle:", this.events.length);
      // Kutsu onMapReady päivitettävien tietojen kanssa
    });
  }
  filterEvents() {
    const currentDate = new Date();
    if (this.id) {
      this.events = this.events.filter((e) => e._id === this.id);
      return;
    }
    // Suodata tapahtumat filtterien mukaisesti
    this.events = this.events.filter((event) => {
      const parts = event.aloituspvm.split(", ");
      const dateParts = parts[1].split(".").map((part) => parseInt(part, 10));

      // Muodosta Date-objekti
      const eventDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);

      const isFutureEvent = eventDate > currentDate;

      return (
        (this.music && event.genre === "music" && isFutureEvent) ||
        (this.family && event.genre === "family" && isFutureEvent) ||
        (this.food && event.genre === "food" && isFutureEvent) ||
        (this.sports && event.genre === "sports" && isFutureEvent)
      );
    });
  }

  onMapReady(args): void {
    console.log("map is ready");
    const markers = [];

    const addedCoordinates = new Set(); // Säilyttää lisätyt koordinaatit

    this.events.forEach((event) => {
      let lat = event.sijainti[0].lat;
      let lng = event.sijainti[0].long;

      // Tarkista, onko samat koordinaatit jo lisätty
      while (addedCoordinates.has(`${lat}-${lng}`)) {
        // Generoi uudet koordinaatit, jos samat koordinaatit löytyvät jo
        lat = event.sijainti[0].lat + Math.random() / 1000;
        lng = event.sijainti[0].long + Math.random() / 1000;
      }

      // Lisää koordinaatit lisättyjen joukkoon
      addedCoordinates.add(`${lat}-${lng}`);
      if (this.id) {
        markers.push({
          lat: lat,
          lng: lng,
          title: event.nimi,
          iconPath: `~/icons/${event.genre}.png`,
          subtitle: event.kuvaus,
          selected: true,
          onCalloutTap: () => {
            console.log("Marker callout tapped", event._id);
            this.router.navigate(["event/", event._id]);
          },
        });

        markers.push({
          lat: this.locationService.latitude,
          lng: this.locationService.longitude,
          title: "You are here",
        });
      } else {
        markers.push({
          lat: lat,
          lng: lng,
          title: event.nimi,
          iconPath: `~/icons/${event.genre}.png`,
          subtitle: event.kuvaus,
          selected: false,
          onCalloutTap: () => {
            console.log("Marker callout tapped", event._id);
            this.router.navigate(["event/", event._id]);
          },
        });

        markers.push({
          lat: this.locationService.latitude,
          lng: this.locationService.longitude,
          title: "You are here",
        });
      }
      // Lisää markkerit kartalle
      args.map.addMarkers(markers);
    });
  }
  navigateToBottombar() {
    this.router.navigate(["bottom-nav"]);
  }
}
