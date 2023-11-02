import { Component } from "@angular/core";
import { EventService } from "../event.service";

@Component({
  selector: "ns-notifications",
  templateUrl: "./notifications.component.html",
  styleUrls: ["./notifications.component.css"],
})
export class NotificationsComponent {
  events: any;
  isLoading: boolean = true;
  constructor(private Eventservice: EventService) {
    this.Eventservice.getEvents().subscribe((res) => {
      this.events = res;
      this.isLoading = false;
      console.log(this.events);
    });
  }
}
