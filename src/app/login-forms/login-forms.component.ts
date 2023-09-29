import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";
@Component({
  selector: "ns-login-forms",
  templateUrl: "./login-forms.component.html",
  styleUrls: ["./login-forms.component.css"],
})
export class LoginFormsComponent {
  myForm: FormGroup;
  data: any;

  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.myForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
    });
  }

  submitLogin() {
    const email = this.myForm.get("email").value;
    const password = this.myForm.get("password").value;
    this.authService.logIn(email, password).subscribe((response) => {
      this.data = response;
    });
  }
}
