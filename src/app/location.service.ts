import { Injectable } from "@angular/core";
import * as geolocation from "@nativescript/geolocation";
import { CoreTypes } from "@nativescript/core"; // used to describe at what accuracy the location should get
import { Observable, from } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class LocationService {
  latitude;
  longitude;
  constructor() {
    this.getLocation();
  }

  getLocation() {
    geolocation
      .getCurrentLocation({
        desiredAccuracy: 3,
        updateDistance: 10,
        maximumAge: 20000,
        timeout: 20000,
      })
      .then((location) => {
        if (location) {
          this.latitude = location.latitude;
          this.longitude = location.longitude;
          console.log("Tässä servicen arvot", location);
        }
      });
  }

  getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    // The math module contains a function
    // named toRadians which converts from
    // degrees to radians.
    lon1 = (lon1 * Math.PI) / 180;
    lon2 = (lon2 * Math.PI) / 180;
    lat1 = (lat1 * Math.PI) / 180;
    lat2 = (lat2 * Math.PI) / 180;

    // Haversine formula
    let dlon = lon2 - lon1;
    let dlat = lat2 - lat1;
    let a =
      Math.pow(Math.sin(dlat / 2), 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);

    let c = 2 * Math.asin(Math.sqrt(a));

    // Radius of earth in kilometers. Use 3956
    // for miles
    let r = 6371;

    // calculate the result
    return c * r;
  }
}
