import { Component } from "@angular/core";
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: "ns-startpage",
  templateUrl: "./startpage.component.html",
  styleUrls: ["./startpage.component.css"],
})
export class StartpageComponent {
  constructor(private router: Router) {}
  routeRegister() {
    this.router.navigate(["register"]);
  }

  routeLogin() {
    this.router.navigate(["login"]);
  }
}
