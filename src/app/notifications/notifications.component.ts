import { Component, OnInit, OnDestroy } from "@angular/core";
import { EventService } from "../event.service";
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import { filter, switchMap, takeUntil } from "rxjs/operators";
import { interval, Subject } from "rxjs";
import { LocationService } from "../location.service";
import { RouterExtensions } from "@nativescript/angular";
import { PanGestureEventData, View } from "@nativescript/core";
import { NgZone } from "@angular/core";

import { Animation } from "@nativescript/core/ui/animation";
import { CoreTypes } from "@nativescript/core";
import { FilterState } from "../filter.reducer";
import { Store } from "@ngrx/store";
import {
  getFamily,
  getMusic,
  getFood,
  getSports,
  getDistance,
} from "../filter.selectors";
@Component({
  selector: "ns-notifications",
  templateUrl: "./notifications.component.html",
  styleUrls: ["./notifications.component.css"],
})
export class NotificationsComponent implements OnInit {
  events: any = [];
  music: Boolean;
  family: boolean;
  food: boolean;
  sports: boolean;
  distance: number;

  isLoading: boolean = true;
  imageUrl: string = "~/images/harrastukset.jpg";
  private destroy$ = new Subject<void>();
  constructor(
    private Eventservice: EventService,
    private locationService: LocationService,
    private routerExtensions: RouterExtensions,
    private ngZone: NgZone,
    private store: Store<{ AppState: FilterState }>
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
    this.store.select(getDistance).subscribe((distance) => {
      this.distance = distance;
    });
  }
  // Alustetaan komponentti ja haetaan tapahtumat. Jos lataus kestää, asetetaan latausikoni näytölle. Suoritetaan loadevents
  // tapahtuma minuutin välein ja päivitetään uusi tilanne näytölle.
  ngOnInit() {
    this.locationService.getLocation();
    this.loadEvents(); // Lataa aluksi tapahtumat

    // Päivitä tapahtumat 5 minuutin välein
    interval(30000) // 30000 ms = 5 minuuttia
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
      this.filterEvents();
      this.isLoading = false;
      console.log(this.events.length);
      console.log(res.length);
    });
  }

  filterEvents() {
    // Suodata tapahtumat filtterien mukaisesti
    this.events = this.events.filter((event) => {
      console.log(event, "Tässä tämän hetkinen tapahtuma");
      const isMusicMatch = this.music === (event.genre === "music");
      const isFamilyMatch = this.family === (event.genre === "family");
      const isFoodMatch = this.food === (event.genre === "food");
      const isSportsMatch = this.sports === (event.genre === "sports");
      const isDistanceMatch = this.eventInsideDistance(
        event.sijainti[0].lat,
        event.sijainti[0].long,
        this.locationService.latitude,
        this.locationService.longitude
      );
      console.log(isMusicMatch, isFamilyMatch, isFoodMatch, isSportsMatch);

      return (
        (isMusicMatch || isFamilyMatch || isFoodMatch || isSportsMatch) &&
        isDistanceMatch
      );
    });
  }
  onSwipe(args: PanGestureEventData) {
    this.ngZone.run(() => {
      console.log("onSwipe called", args.state, args.deltaX);
      const view = <View>args.object;
      if (args.state === 1 || args.state === 2 || args.state === 3) {
        // Tarkista, että deltaX on negatiivinen (vasemmalle suuntautuva swipe)
        if (args.deltaX < 0) {
          view.translateX = args.deltaX;
        }
      }
      if (args.state === 3 && args.deltaX < -50) {
        const slideAnimation = new Animation([
          {
            target: view,
            translate: { x: args.deltaX, y: 0 },
            duration: 200,
            curve: CoreTypes.AnimationCurve.easeInOut,
          },
          {
            target: view,
            translate: { x: 0, y: 0 },
            duration: 200,
            curve: CoreTypes.AnimationCurve.easeInOut,
          },
        ]);

        slideAnimation.play().then(() => {
          this.routerExtensions.navigate(["/likedevents"], {
            transition: {
              name: "slideLeft",
            },
          });
        });
      }
    });
  }
  eventInsideDistance(lat1, long1, lat2, long2) {
    console.log(lat1, long1, lat2, long2, "Tässä vertailtavat arvot");
    const d = this.locationService.getDistance(lat1, long1, lat2, long2);
    console.log("Tässä yksi vertailu ", d);
    return d <= this.distance;
  }
}
