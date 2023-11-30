import { Component, ChangeDetectorRef, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Location, PlatformLocation } from "@angular/common";
import { filter } from "rxjs/operators";

@Component({
  selector: "ns-bottom-nav",
  templateUrl: "./bottom-nav.component.html",
  styleUrls: ["./bottom-nav.component.css"],
})
export class BottomNavComponent {
  active: number = 0; //Käynnistyessä aktiivinen bottom-navin osa
  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router,
    private location: Location,
    private platformLocation: PlatformLocation
  ) {
    console.log("Active on ", this.active);
  }

  // Vaihdetaan aktiivinen näytettävä osa bottom-navista
  changeActive(index: number) {
    this.active = index;
    console.log(this.active);
  }

  navigateToMap() {
    this.router.navigate(["/map"]); // Olettaen, että reititin on konfiguroitu ja '/map' on oikea reitti karttakomponenttiin
  }
}
