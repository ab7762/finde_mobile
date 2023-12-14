import {
  Component,
  ViewChild,
  NgModule,
  ViewContainerRef,
} from "@angular/core";
import { TNSCheckBoxModule } from "@nstudio/nativescript-checkbox/angular";
import { AuthService } from "../auth.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ModalDialogService, ModalDialogOptions } from "@nativescript/angular";
import { ModalComponent } from "../modal/modal.component";
import { ExtendedShowModalOptions } from "nativescript-windowed-modal";
@Component({
  selector: "ns-register-forms",
  templateUrl: "./register-forms.component.html",
  styleUrls: ["./register-forms.component.css"],
})
export class RegisterFormsComponent {
  isPressed = false;
  isPressedPrivacy = false;
  text2: string =
    "Rekisteröityminen epäonnistui. Tarkista internet-yhteys ja syötetyt tiedot.";
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private modalService: ModalDialogService
  ) {
    this.myForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      firstname: ["", [Validators.required]],
      lastname: ["", [Validators.required]],
      password: ["", [Validators.required]],
      password2: ["", [Validators.required]],
    });
  }
  myForm: FormGroup;
  data: any;
  salasanaError: boolean = false;
  emailError: boolean = false;
  isChecked: boolean = false;
  // Vaihdetaan checkbox-arvoa.
  changeChecked(args: any) {
    const checkBox = args.object;
    this.isChecked = checkBox.checked;
    console.log(this.isChecked);
  }
  // Rekisteröitymis-funktio. Eri tietojen validoinnin tarkistus.
  // Jos validointi menee läpi, suoritetaan servicen funktio.
  submitSignUp() {
    this.salasanaError = false;
    this.emailError = false;
    const email = this.myForm.get("email").value;
    const firstname = this.myForm.get("firstname").value;
    const lastname = this.myForm.get("lastname").value;
    const password = this.myForm.get("password").value;
    const password2 = this.myForm.get("password2").value;
    if (password !== password2) {
      console.log("Password confirmation errror");
      this.salasanaError = true;

      console.log(this.salasanaError);
      return false;
    } else if (email.indexOf("@") == -1) {
      console.log("ei ole merkkiä");
      this.emailError = true;
      return false;
    }
    this.authService
      .signUp(firstname, lastname, email, password)
      .subscribe((response) => {
        if (response) {
          // Rekisteröityminen onnistui, avaa moduuli
        } else {
        }
      });
  }
  // Siirrytään login-sivulle
  routeLogin() {
    this.isPressed = !this.isPressed;
    setTimeout(() => {
      this.isPressed = false; // Aseta takaisin false
      this.router.navigate(["login"]); // Suorita reititys
    }, 300); // Aseta viive aikaan millisekunteina, esim. 3
  }
  routePrivacy() {
    this.isPressedPrivacy = !this.isPressedPrivacy;
    setTimeout(() => {
      this.isPressedPrivacy = false; // Aseta takaisin false
      this.router.navigate(["userprivacy"]); // Suorita reititys
    }, 300); // Aseta viive aikaan millisekunteina, esim. 3
  }
}
