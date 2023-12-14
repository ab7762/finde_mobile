import { Component, Input, ChangeDetectorRef } from "@angular/core";
import { format } from "date-fns";
import { Router, RouterLink } from "@angular/router";
import { registerElement } from "@nativescript/angular";
import { CardView } from "@nstudio/nativescript-cardview";
import { LocationService } from "../location.service";
import { NavigationExtras } from "@angular/router";

registerElement("CardView", () => CardView);

@Component({
  selector: "ns-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.css"],
})
export class CardComponent {
  isPressed: boolean = false;
  distance: any;
  @Input() eventData: any;
  constructor(
    public locationService: LocationService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}
  // Otetaan vastaan tietoja

  // format-kirjastolla käännetään päivämäärä suomenkieliseksi
  dateToFinnish(date: string) {
    let time = new Date(date);
    return format(time, "dd.MM.yyyy");
  }

  routeEvent() {
    const navigationExtras: NavigationExtras = {
      state: {
        eventData: this.eventData,
      },
    };
    this.router.navigate(["event"], navigationExtras);
  }
  buttonActive() {
    this.isPressed = true;
    this.cdr.detectChanges();
    setTimeout(() => {
      this.isPressed = false;
      this.cdr.detectChanges(); // Aseta takaisin false
    }, 100); // Aseta viive aikaan millisekunteina, esim. 3
  }

  ngOnDestroy() {
    this.isPressed = false;
  }
}
