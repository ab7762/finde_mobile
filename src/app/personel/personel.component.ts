import { Component } from "@angular/core";

@Component({
  selector: "ns-personel",
  templateUrl: "./personel.component.html",
  styleUrls: ["./personel.component.css"],
})
export class PersonelComponent {
  constructor() {
    console.log("personel avattu");
  }
}
