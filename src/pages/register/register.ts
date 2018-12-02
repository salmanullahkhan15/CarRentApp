import {Component} from "@angular/core";
import {Events, NavController} from "ionic-angular";
import {LoginPage} from "../login/login";
import {HomePage} from "../home/home";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthProvider} from "../../providers/auth/auth";
import {UtilitService} from "../../services/utilit-service";


@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  authForm: FormGroup;

  constructor(public nav: NavController,
              public authService: AuthProvider,
              public formBuilder: FormBuilder,
              public events: Events,
              public utilit: UtilitService) {

    this.authForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern('^([a-zA-Z0-9_\\.\\-])+\\@(([a-zA-Z0-9\\-])+\\.)+([a-zA-Z0-9]{2,4})+$')])],
      name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    });
  }

  // register and go to home page
  onSubmit(value: any): void {

    if (this.authForm.valid) {

      this.utilit.showLoader();

      let credentials = {
        name: value.name,
        email: value.email,
        password: value.password,
        role: 'user',
      };
      console.log(credentials);

      this.authService.createAccount(credentials).then((result) => {

        this.utilit.hideLoader();
        console.log(result);

        this.events.publish('user:login', result['user'], Date.now());

        this.utilit.showToast({
          message: 'Signup successful',
          duration: 2000,
          position: 'bottom',
        });

        this.nav.setRoot(HomePage);

      }, (err) => {

        this.utilit.hideLoader();
        console.log(err);

        this.utilit.showToast({
          message: err.error.msg + '. Please try again',
          duration: 5000,
          position: 'bottom',
          cssClass: 'dark-trans',
          closeButtonText: 'OK',
          showCloseButton: true
        });

      });

    }
  }

  // go to login page
  login() {
    this.nav.setRoot(LoginPage);
  }
}
