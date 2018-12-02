import {Component} from "@angular/core";
import {NavController, AlertController, ToastController, MenuController, Events} from "ionic-angular";
import {HomePage} from "../home/home";
import {RegisterPage} from "../register/register";
import {RegisterOwnerPage} from "../register-owner/register-owner";
import {DashboardPage} from "../dashboard/dashboard";
import {AuthProvider} from "../../providers/auth/auth";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Storage} from "@ionic/storage";
import {UtilitService} from "../../services/utilit-service";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  authForm: FormGroup;
  email: string;

  constructor(public nav: NavController,
              public alertCtrl: AlertController,
              public menu: MenuController,
              public toastCtrl: ToastController,
              public authService: AuthProvider,
              public utilit: UtilitService,
              public storage: Storage,
              public events: Events,
              public formBuilder: FormBuilder) {
    this.menu.swipeEnable(false);

    this.authForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern('^([a-zA-Z0-9_\\.\\-])+\\@(([a-zA-Z0-9\\-])+\\.)+([a-zA-Z0-9]{2,4})+$')])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  ionViewDidLoad() {

    this.utilit.showLoader();

    //Check if already authenticated
    this.authService.checkAuthentication().then((res) => {
      console.log("Already authorized");

      this.events.publish('user:login', this.authService.user, Date.now());

      this.utilit.hideLoader();

      console.log(this.authService.user);

      if(this.authService.user.role == 'owner') {
        this.nav.setRoot(DashboardPage);
      } else {
        this.nav.setRoot(HomePage);
      }

    }, (err) => {
      console.log("Not already authorized");
      this.utilit.hideLoader();
    });

  }

  // go to register page
  register() {
    this.nav.setRoot(RegisterPage);
  }

  registerOwner() {
    this.nav.setRoot(RegisterOwnerPage);
  }

  // login and go to home page
  onSubmit(value: any): void {
    if (this.authForm.valid) {
      this.utilit.showLoader();
      this.authService.login(this.authForm.value).then((result) => {

        this.utilit.hideLoader();
        console.log(result);

        this.events.publish('user:login', result['user'], Date.now());

        this.utilit.showToast({
          message: 'Login successful',
          duration: 2000,
          position: 'bottom',
        });

        if(result['user']['role'] == 'owner') {
          this.nav.setRoot(DashboardPage);
        } else {
          this.nav.setRoot(HomePage);
        }

      }, (err) => {
        this.utilit.hideLoader();
        console.log(err);

        this.utilit.showToast({
          message: err.error.msg + '. Error in Login',
          duration: 5000,
          position: 'bottom',
          cssClass: 'dark-trans',
          closeButtonText: 'OK',
          showCloseButton: true
        });
      });
    }
  }

  forgotPass() {
    let forgot = this.alertCtrl.create({
      title: 'Forgot Password?',
      message: "Enter you email address to send a reset link password.",
      inputs: [
        {
          name: 'email',
          placeholder: 'Email',
          type: 'email'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: data => {
            console.log('Send clicked');
            let toast = this.toastCtrl.create({
              message: 'Email was sended successfully',
              duration: 3000,
              position: 'top',
              cssClass: 'dark-trans',
              closeButtonText: 'OK',
              showCloseButton: true
            });
            toast.present();
          }
        }
      ]
    });
    forgot.present();
  }

}
