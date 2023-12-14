import { Component, OnInit, OnDestroy } from "@angular/core";
import { EventService } from "../event.service";
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import { filter, switchMap, takeUntil } from "rxjs/operators";
import { interval, Subject } from "rxjs";
import { LocationService } from "../location.service";
import { SecureStorage } from "@nativescript/secure-storage";
import { RouterExtensions } from "@nativescript/angular";
import { PanGestureEventData, View } from "@nativescript/core";
import { NgZone } from "@angular/core";

import { Animation } from "@nativescript/core/ui/animation";
import { CoreTypes } from "@nativescript/core";

const secureStorage = new SecureStorage();
@Component({
  selector: "ns-liked-events",
  templateUrl: "./liked-events.component.html",
  styleUrls: ["./liked-events.component.css"],
})
export class LikedEventsComponent {
  events: any;
  userid: any;
  isLoading: boolean = true;
  imageUrl: string = "~/images/harrastukset.jpg";
  private destroy$ = new Subject<void>();
  constructor(
    private Eventservice: EventService,
    private locationService: LocationService,
    private routerExtensions: RouterExtensions,
    private ngZone: NgZone,
    private router: Router
  ) {}
  // Alustetaan komponentti ja haetaan tapahtumat. Jos lataus kestää, asetetaan latausikoni näytölle. Suoritetaan loadevents
  // tapahtuma minuutin välein ja päivitetään uusi tilanne näytölle.
  ngOnInit() {
    this.getLikedEvents(); // Lataa aluksi tapahtumat
    this.isLoading = false;
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe((event: NavigationEnd) => {
        const previousRoute = this.router.url; // Tarkista edellinen reitti url-ominaisuuden avulla
        if (previousRoute.includes("event")) {
          // Edellinen reitti oli 'events', tee tarvittavat toimet komponentin uudelleen alustamiseksi
          this.ngOnInit();
        }
      });
  }

  // Haetaan tykätyt tapahtumat käyttäjän id:n perusteella
  async getLikedEvents() {
    try {
      this.userid = await secureStorage.get({
        key: "id",
      });
    } catch (error) {
      console.error("Error retrieving token from secure storage:", error);
    }
    this.Eventservice.getLikedEvents(this.userid).subscribe((res) => {
      this.events = res;
    });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  //Jos swaipataan vasemmalle nuolta tarpeeksi pitkälle, navigoidaan bottom-nav komponentille
  onSwipe(args: PanGestureEventData) {
    this.ngZone.run(() => {
      console.log("onSwipe called", args.state, args.deltaX);
      const view = <View>args.object;
      if (args.state === 1 || args.state === 2 || args.state === 3) {
        // Tarkista, että deltaX on negatiivinen (vasemmalle suuntautuva swipe)
        if (args.deltaX > 0) {
          view.translateX = args.deltaX;
        }
      }
      if (args.state === 3 && args.deltaX > 50) {
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
          this.routerExtensions.navigate(["/bottom-nav"], {
            transition: {
              name: "slideRight",
            },
          });
        });
      }
    });
  }
}
