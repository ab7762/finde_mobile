import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "@nativescript/angular";
import { NativeScriptFormsModule } from "@nativescript/angular";
import { NativeScriptMaterialBottomNavigationModule } from "@nativescript-community/ui-material-bottom-navigation/angular";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ItemsComponent } from "./item/items.component";
import { ItemDetailComponent } from "./item/item-detail.component";
import { LoginComponent } from "./login/login.component";
import { LoginFormsComponent } from "./login-forms/login-forms.component";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RegisterComponent } from "./register/register.component";
import { RegisterFormsComponent } from "./register-forms/register-forms.component";
import { CheckBoxModule } from "@nativescript-community/ui-checkbox/angular";
import { StartpageComponent } from "./startpage/startpage.component";
import { BottomNavComponent } from "./bottom-nav/bottom-nav.component";
import { StoreModule } from "@ngrx/store";
import { authReducer, AuthState } from "./auth.reducer";
import { MapComponent } from "./map/map.component";
import { NotificationsComponent } from "./notifications/notifications.component";
import { CardComponent } from "./card/card.component";
import { PersonelComponent } from "./personel/personel.component";
import { LoadingPageComponent } from "./loading-page/loading-page.component";
import { EventComponent } from "./event/event.component";
import {
  ExtendedShowModalOptions,
  ModalStack,
  overrideModalViewMethod,
} from "nativescript-windowed-modal";
import { ModalModule } from "./modal/modal.module";
import { filterReducer } from "./filter.reducer";
import { LikedEventsComponent } from "./liked-events/liked-events.component";
import { UserPrivacyComponent } from "./user-privacy/user-privacy.component";
import { SettingsComponent } from "./settings/settings.component";

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    NativeScriptModule,
    AppRoutingModule,
    NativeScriptMaterialBottomNavigationModule,
    HttpClientModule,
    FormsModule,
    NativeScriptFormsModule,
    ModalModule,
    ReactiveFormsModule,

    CheckBoxModule,
    StoreModule.forRoot({ appState: authReducer, filterState: filterReducer }),
  ],
  declarations: [
    AppComponent,
    ItemsComponent,
    ItemDetailComponent,
    LoginComponent,
    LoginFormsComponent,
    RegisterComponent,
    RegisterFormsComponent,
    StartpageComponent,
    BottomNavComponent,
    MapComponent,
    NotificationsComponent,
    CardComponent,
    PersonelComponent,
    LoadingPageComponent,
    EventComponent,
    LikedEventsComponent,
    UserPrivacyComponent,
    SettingsComponent,
  ],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
