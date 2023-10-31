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
import { MapComponent } from "./map/map.component";
import { NotificationsComponent } from "./notifications/notifications.component";
const routes: Routes = [
  { path: "", redirectTo: "register", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "start", component: StartpageComponent },
  {
    path: "bottom-nav",
    component: BottomNavComponent,
    canActivate: [AuthGuard],
  },
  { path: "login", component: LoginComponent },
  { path: "map", component: MapComponent, canActivate: [AuthGuard] },
  {
    path: "notifications",
    component: NotificationsComponent,
  },
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule],
})
export class AppRoutingModule {}
