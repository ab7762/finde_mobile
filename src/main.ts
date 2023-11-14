import {
  platformNativeScript,
  runNativeScriptAngularApp,
  registerElement,
} from "@nativescript/angular";

import {
  ModalStack,
  overrideModalViewMethod,
  ExtendedShowModalOptions,
} from "nativescript-windowed-modal";
import { wireInGoogleSignIn } from "@klippa/nativescript-login";
import { AppModule } from "./app/app.module";
wireInGoogleSignIn(
  "1017943398721-3mn1e33h9nckasm3q70l7dqhsfl5813i.apps.googleusercontent.com"
);
overrideModalViewMethod();
registerElement("ModalStack", () => ModalStack as any);
runNativeScriptAngularApp({
  appModuleBootstrap: () => platformNativeScript().bootstrapModule(AppModule),
});
