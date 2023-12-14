import { Component } from "@angular/core";
import { Location } from "@angular/common";

@Component({
  selector: "ns-user-privacy",
  templateUrl: "./user-privacy.component.html",
  styleUrls: ["./user-privacy.component.css"],
})
export class UserPrivacyComponent {
  constructor(private location: Location) {}
  goBack() {
    this.location.back();
  }
}
