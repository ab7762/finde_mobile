import { registerElement } from "@nativescript/angular";
registerElement(
  "MapView",
  () => require("nativescript-google-maps-sdk").MapView
);

// In your component:
import { Component } from "@angular/core";

@Component({
  selector: "my-map",
  template: `
    <GridLayout>
      <MapView [latitude]="lat" [longitude]="lon" [zoom]="zoom"></MapView>
    </GridLayout>
  `,
})
export class MapComponent {
  lat = 37.7749; // Your initial latitude
  lon = -122.4194; // Your initial longitude
  zoom = 10; // Zoom level
}
