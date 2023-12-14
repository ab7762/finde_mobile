import { Component, Input } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { EventService } from "../event.service";
import { Location } from "@angular/common";
import { format } from "date-fns";
import { SecureStorage } from "@nativescript/secure-storage";

const secureStorage = new SecureStorage();
@Component({
  selector: "ns-event",
  templateUrl: "./event.component.html",
  styleUrls: ["./event.component.css"],
})
export class EventComponent {
  isPressed: boolean = false;
  event: any;
  token: any;
  userid: any;
  events: any;
  id: any;
  liked: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private location: Location,
    private router: Router
  ) {}
  // Haetaan reitin parametristä oikea id ja filteröidään tapahtumista oikea id.
  // Sitten tallennetaan muuttujaan oikeat tiedot, joita voidaan näyttää komponentissa.
  ngOnInit(): void {
    const id = String(this.route.snapshot.paramMap.get("id"));
    console.log(id);
    this.id = id;
    this.eventService.getEvents().subscribe((res) => {
      let e = res;
      let ee = e.filter((event) => event._id === id);
      this.event = ee;
      console.log("Tässä event", this.event);
    });
    this.getLikedBoolean();
  }
  // Muutetaan päivämäärä eurooppalaiseen / suomalaiseen muotoon.
  dateToFinnish(date: string) {
    let time = new Date(date);
    return format(time, "dd.MM.yyyy");
  }
  // Navigoidaan takaisin edelliseen näkymään
  goBack(): void {
    this.isPressed = !this.isPressed;
    setTimeout(() => {
      this.isPressed = false; // Aseta takaisin false
      this.location.back(); // Suorita reititys
    }, 200); // Aseta viive aikaan millisekunteina, esim. 3
  }
  // Haetaan id:n perusteella, onko käyttäjä tykännyt tästä tapahtumasta
  async getLikedBoolean() {
    try {
      this.userid = await secureStorage.get({
        key: "id",
      });
      console.log(this.userid);
    } catch (error) {
      console.error("Error retrieving token from secure storage:", error);
      return; // Keskeytä suoritusvirheen tapauksessa
    }

    try {
      const res = await this.eventService
        .getLikedEvents(this.userid)
        .toPromise();
      this.events = res;

      const isEventLiked = this.events.some(
        (event) => event._id === this.event[0]._id
      );

      // Päivitä liked-muuttuja sen mukaisesti
      this.liked = isEventLiked;
    } catch (error) {
      console.error("Error fetching liked events:", error);
    }
  }
  // Päivitetään käyttäjän id:n ja tapahtuman id:n perusteella käyttäjälle tapahtuma tykätyt tapahtumat taulukkoon
  async likeEvent() {
    try {
      this.token = await secureStorage.get({
        key: "token",
      });
      console.log(this.token);
    } catch (error) {
      console.error("Error retrieving token from secure storage:", error);
    }
    try {
      this.userid = await secureStorage.get({
        key: "id",
      });
      console.log(this.userid);
    } catch (error) {
      console.error("Error retrieving token from secure storage:", error);
    }

    this.eventService
      .likeEvent(this.userid, this.event[0]._id, this.token)
      .subscribe((res) => console.log(res));
    this.liked = !this.liked;
  }
  // Poistetaan tapahtuma käyttäjän tykätyt taulukosta
  async dislike() {
    try {
      this.token = await secureStorage.get({
        key: "token",
      });
      console.log(this.token);
    } catch (error) {
      console.error("Error retrieving token from secure storage:", error);
    }
    try {
      this.userid = await secureStorage.get({
        key: "id",
      });
      console.log(this.userid);
    } catch (error) {
      console.error("Error retrieving token from secure storage:", error);
    }
    this.eventService
      .unlikeEvent(this.userid, this.event[0]._id, this.token)
      .subscribe((res) => console.log(res));
    this.liked = !this.liked;
  }
  // Avataan kartta-komponentti dynaamista reittiä käyttäen, jolloin vain reitin kautta välitetty tapahtuma näkyy
  // kartalla
  openToMap() {
    this.router.navigate(["map/", this.id]);
  }
}
