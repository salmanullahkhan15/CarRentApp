import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {LoginPage} from "../login/login";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthProvider} from "../../providers/auth/auth";
import {UtilitService} from "../../services/utilit-service";
import {Storage} from "@ionic/storage";
import {PLACES} from "../../services/mock-locations";


@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  authForm: FormGroup;
  public loginUser: any = {};
  public places : any = PLACES;

  constructor(public nav: NavController,
              public authService: AuthProvider,
              public formBuilder: FormBuilder,
              public utilit: UtilitService,
              public storage: Storage,
  ) {

    this.authForm = formBuilder.group({
      _id: [''],
      email: ['', Validators.compose([Validators.required, Validators.pattern('^([a-zA-Z0-9_\\.\\-])+\\@(([a-zA-Z0-9\\-])+\\.)+([a-zA-Z0-9]{2,4})+$')])],
      name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
    });

    this.storage.get('user').then((loginUser) => {
      this.loginUser = loginUser;

      if(this.loginUser.role == 'owner') {
        this.authForm = formBuilder.group({
          _id: [''],
          email: ['', Validators.compose([Validators.required, Validators.pattern('^([a-zA-Z0-9_\\.\\-])+\\@(([a-zA-Z0-9\\-])+\\.)+([a-zA-Z0-9]{2,4})+$')])],
          name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
          company: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
          city: ['', Validators.compose([Validators.required])],
          address: ['', Validators.compose([Validators.required])],
          phone: ['', Validators.compose([Validators.required, Validators.minLength(11), Validators.maxLength(13)])],
        });
      }

      this.getProfile();
    }).catch((err) => {
      console.log(err)
    });
  }

  ionViewDidLoad() {

  }

  onSubmit(value: any): void {

    if (this.authForm.valid) {

      this.utilit.showLoader();

      this.authService.updateProfile(this.authForm.value).then((result) => {

        this.utilit.hideLoader();
        console.log(result);

        this.utilit.showToast({
          message: 'Updated successful',
          duration: 2000,
          position: 'top',
        });

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

  getProfile() {
    this.utilit.showLoader();

    this.authService.getProfile({Id: this.loginUser.id}).then((res) => {

      this.authForm.patchValue(res['user']);
      this.utilit.hideLoader();

    }, (err) => {
      this.utilit.hideLoader();
    });

  }


  // logout
  logout() {
    this.nav.setRoot(LoginPage);
  }
}
