import { Component, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { EventService } from "../event.service";
import { Location } from "@angular/common";
import { format } from "date-fns";
@Component({
  selector: "ns-event",
  templateUrl: "./event.component.html",
  styleUrls: ["./event.component.css"],
})
export class EventComponent {
  event: any;
  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private location: Location
  ) {}
  // Haetaan reitin parametristä oikea id ja filteröidään tapahtumista oikea id.
  // Sitten tallennetaan muuttujaan oikeat tiedot, joita voidaan näyttää komponentissa.
  ngOnInit(): void {
    const id = String(this.route.snapshot.paramMap.get("id"));
    console.log(id);
    this.eventService.getEvents().subscribe((res) => {
      let e = res;
      let ee = e.filter((event) => event._id === id);
      this.event = ee;
      console.log("Tässä event", this.event);
    });
  }
  // Muutetaan päivämäärä eurooppalaiseen / suomalaiseen muotoon.
  dateToFinnish(date: string) {
    let time = new Date(date);
    return format(time, "dd.MM.yyyy");
  }
  // Navigoidaan takaisin edelliseen näkymään
  goBack(): void {
    this.location.back();
  }
}
