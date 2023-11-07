import { Component } from "@angular/core";

@Component({
  selector: "ns-bottom-nav",
  templateUrl: "./bottom-nav.component.html",
  styleUrls: ["./bottom-nav.component.css"],
})
export class BottomNavComponent {
  active: number = 2; //Käynnistyessä aktiivinen bottom-navin osa
  constructor() {}

  // Vaihdetaan aktiivinen näytettävä osa bottom-navista
  changeActive(index: number) {
    this.active = index;
    console.log(this.active);
  }
}
