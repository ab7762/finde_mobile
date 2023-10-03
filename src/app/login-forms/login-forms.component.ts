import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AuthState } from "../auth.reducer";
import { login, logout } from "../auth.actions";
import { Observable } from "rxjs";
@Component({
  selector: "ns-login-forms",
  templateUrl: "./login-forms.component.html",
  styleUrls: ["./login-forms.component.css"],
})
export class LoginFormsComponent {
  myForm: FormGroup;
  data: any;
  loggedIn$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private store: Store<AuthState>
  ) {
    this.myForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
    });
    this.loggedIn$ = this.store.select((state) => state.loggedIn);
  }

  submitLogin() {
    const email = this.myForm.get("email").value;
    const password = this.myForm.get("password").value;
    this.authService.logIn(email, password).subscribe((response) => {
      this.store.dispatch(login());
    });
  }

  routeRegister() {
    this.router.navigate(["register"]);
  }
}
