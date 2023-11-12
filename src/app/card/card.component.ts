import { Component, Input } from "@angular/core";
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
  distance: any;
  @Input() eventData: any;
  constructor(
    public locationService: LocationService,
    private router: Router
  ) {}
  // Otetaan vastaan tietoja

  // format-kirjastolla käännetään päivämäärä suomenkieliseksi
  dateToFinnish(date: string) {
    let time = new Date(date);
    return format(time, "dd.MM.yyyy");
  }

  routeEvent() {
    console.log(this.eventData);
    const navigationExtras: NavigationExtras = {
      state: {
        eventData: this.eventData,
      },
    };
    this.router.navigate(["event"], navigationExtras);
  }
}
