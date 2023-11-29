//Sisältää reitit. Joitain reittejä on suojattu reittivahdilla.

import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";

import { LoginComponent } from "./login/login.component";
import { LoginFormsComponent } from "./login-forms/login-forms.component";
import { ItemsComponent } from "./item/items.component";
import { ItemDetailComponent } from "./item/item-detail.component";
import { RegisterComponent } from "./register/register.component";
import { StartpageComponent } from "./startpage/startpage.component";
import { BottomNavComponent } from "./bottom-nav/bottom-nav.component";
import { AuthGuard } from "./auth.guard";
import { LogGuard } from "./log.guard";
import { MapComponent } from "./map/map.component";
import { NotificationsComponent } from "./notifications/notifications.component";
import { PersonelComponent } from "./personel/personel.component";
import { EventComponent } from "./event/event.component";
import { LikedEventsComponent } from "./liked-events/liked-events.component";
import { LoadingPageComponent } from "./loading-page/loading-page.component";
import { SettingsComponent } from "./settings/settings.component";
const routes: Routes = [
  { path: "", redirectTo: "settings", pathMatch: "full" },

  { path: "register", component: RegisterComponent, canActivate: [LogGuard] },
  { path: "start", component: StartpageComponent, canActivate: [LogGuard] },
  {
    path: "bottom-nav",
    component: BottomNavComponent,
    canActivate: [AuthGuard],
  },
  { path: "login", component: LoginComponent, canActivate: [LogGuard] },
  { path: "map", component: MapComponent, canActivate: [AuthGuard] },
  {
    path: "notifications",
    component: NotificationsComponent,
    canActivate: [AuthGuard],
  },
  { path: "personel", component: PersonelComponent, canActivate: [AuthGuard] },
  { path: "event/:id", component: EventComponent },
  { path: "likedevents", component: LikedEventsComponent },
  { path: "settings", component: SettingsComponent },
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule],
})
export class AppRoutingModule {}
