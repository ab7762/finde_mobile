import { Component, OnInit } from "@angular/core";
import { EventService } from "../event.service";
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import { filter } from "rxjs/operators";
@Component({
  selector: "ns-notifications",
  templateUrl: "./notifications.component.html",
  styleUrls: ["./notifications.component.css"],
})
export class NotificationsComponent implements OnInit {
  events: any;
  isLoading: boolean = true;
  imageUrl: string = "~/images/harrastukset.jpg";
  constructor(private Eventservice: EventService) {}
  ngOnInit() {
    this.Eventservice.getEvents().subscribe((res) => {
      this.events = res;
      this.isLoading = false;
      console.log(this.events);
    });
  }
}
