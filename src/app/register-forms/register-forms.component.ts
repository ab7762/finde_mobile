import { Component, ViewChild, NgModule } from "@angular/core";
import { TNSCheckBoxModule } from "@nstudio/nativescript-checkbox/angular";
import { AuthService } from "../auth.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
@Component({
  selector: "ns-register-forms",
  templateUrl: "./register-forms.component.html",
  styleUrls: ["./register-forms.component.css"],
})
export class RegisterFormsComponent {
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
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

  changeChecked(args: any) {
    const checkBox = args.object;
    this.isChecked = checkBox.checked;
    console.log(this.isChecked);
  }

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
    } else if (email.indexOf("@") == -1) {
      console.log("ei ole merkkiä");
      this.emailError = true;
      return false;
    }
    this.authService
      .signUp(firstname, lastname, email, password)
      .subscribe((response) => {
        this.data = response;
      });
  }
  routeLogin() {
    this.router.navigate(["login"]);
  }
}
