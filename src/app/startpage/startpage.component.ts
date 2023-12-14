import { Component } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { Store, select } from "@ngrx/store";
import { getFamily } from "../filter.selectors";
import { FilterState } from "../filter.reducer";

@Component({
  selector: "ns-startpage",
  templateUrl: "./startpage.component.html",
  styleUrls: ["./startpage.component.css"],
})
export class StartpageComponent {
  isPressed = false;
  constructor(
    private router: Router,
    private store: Store<{ appState: FilterState }>
  ) {}

  routeRegister() {
    this.router.navigate(["register"]);
  }

  routeLogin() {
    this.isPressed = !this.isPressed;
    setTimeout(() => {
      this.isPressed = false; // Aseta takaisin false
      this.router.navigate(["login"]); // Suorita reititys
    }, 300); // Aseta viive aikaan millisekunteina, esim. 3
  }
}
