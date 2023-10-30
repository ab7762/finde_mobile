import { Component } from "@angular/core";
import { registerElement } from "@nativescript/angular";
import { EventService } from "../event.service";
registerElement(
  "Mapbox",
  () => require("@nativescript-community/ui-mapbox").MapboxView
);

@Component({
  selector: "ns-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"],
})
export class MapComponent {
  events: any;
  constructor(private eventService: EventService) {
    this.eventService.getEvents().subscribe((response) => {
      this.events = response;
      console.log(this.events);
    });
  }
  onMapReady(args): void {
    console.log("map is ready");
    args.map.addMarkers([
      {
        lat: this.events[0].sijainti[0].long,
        lng: this.events[0].sijainti[0].lat,
        title: this.events[0].nimi,
        subtitle: this.events[0].kuvaus,

        selected: false, // makes the callout show immediately when the marker is added (note: only 1 marker can be selected at a time)
        onCalloutTap: function () {
          console.log("'Nice location' marker callout tapped");
        },
      },
      {
        lat: 62.24149,
        lng: 25.7315,
        title: "Konsta hakkaa konsolia",
        subtitle: "Ea sports, in the game",
        iconPath: "/icons/game-controller.png",
        selected: false, // makes the callout show immediately when the marker is added (note: only 1 marker can be selected at a time)
        onCalloutTap: function () {
          console.log("'Nice location' marker callout tapped");
        },
      },
    ]);
  }
}
