import { Component } from "@angular/core";
import { registerElement } from "@nativescript/angular";
import { CardView } from "@nstudio/nativescript-cardview";
registerElement("CardView", () => CardView);

@Component({
  selector: "ns-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.css"],
})
export class CardComponent {}
