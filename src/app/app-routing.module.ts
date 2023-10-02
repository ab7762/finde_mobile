import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";

import { LoginComponent } from "./login/login.component";
import { LoginFormsComponent } from "./login-forms/login-forms.component";
import { ItemsComponent } from "./item/items.component";
import { ItemDetailComponent } from "./item/item-detail.component";
import { RegisterComponent } from "./register/register.component";
import { StartpageComponent } from "./startpage/startpage.component";

const routes: Routes = [
  { path: "", redirectTo: "start", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "start", component: StartpageComponent },
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule],
})
export class AppRoutingModule {}
