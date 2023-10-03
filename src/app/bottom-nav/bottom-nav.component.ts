import { Component } from "@angular/core";

@Component({
  selector: "ns-bottom-nav",
  templateUrl: "./bottom-nav.component.html",
  styleUrls: ["./bottom-nav.component.css"],
})
export class BottomNavComponent {
  active: number = 1;
  constructor() {
    console.log(this.active);
  }

  changeActive(index: number) {
    this.active = index;
  }
}
