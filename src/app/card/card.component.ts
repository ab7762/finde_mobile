import { Component, Input } from "@angular/core";
import { format } from "date-fns";
import { registerElement } from "@nativescript/angular";
import { CardView } from "@nstudio/nativescript-cardview";
registerElement("CardView", () => CardView);

@Component({
  selector: "ns-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.css"],
})
export class CardComponent {
  // Otetaan vastaan tietoja
  @Input() eventData: any;
  // format-kirjastolla käännetään päivämäärä suomenkieliseksi
  dateToFinnish(date: string) {
    let time = new Date(date);
    return format(time, "dd.MM.yyyy");
  }
}
