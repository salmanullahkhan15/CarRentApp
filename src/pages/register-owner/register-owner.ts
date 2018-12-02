import {Component} from "@angular/core";
import {Events, NavController} from "ionic-angular";
import {LoginPage} from "../login/login";
import {DashboardPage} from "../dashboard/dashboard";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthProvider} from "../../providers/auth/auth";
import {UtilitService} from "../../services/utilit-service";
import {PLACES} from "../../services/mock-locations";


@Component({
  selector: 'page-register-owner',
  templateUrl: 'register-owner.html'
})
export class RegisterOwnerPage {

  authForm: FormGroup;
  public places : any = PLACES;

  constructor(public nav: NavController,
              public authService: AuthProvider,
              public formBuilder: FormBuilder,
              public events: Events,
              public utilit: UtilitService) {

    this.authForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern('^([a-zA-Z0-9_\\.\\-])+\\@(([a-zA-Z0-9\\-])+\\.)+([a-zA-Z0-9]{2,4})+$')])],
      name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      company: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      city: ['', Validators.compose([Validators.required])],
      address: ['', Validators.compose([Validators.required])],
      phone: ['', Validators.compose([Validators.required, Validators.minLength(11), Validators.maxLength(13)])],
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
        company: value.company,
        city: value.city,
        address: value.address,
        phone: value.phone,
        role: 'owner',
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

        this.nav.setRoot(DashboardPage);

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
