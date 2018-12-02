import {Injectable} from "@angular/core";
import {AlertController, ToastController, LoadingController} from "ionic-angular";

@Injectable()
export class UtilitService {

  private loading: any;

  constructor(public alertCtrl: AlertController, public toastCtrl: ToastController, public loadingCtrl: LoadingController) {
  }

  showLoader() {

    this.loading = this.loadingCtrl.create({
      content: 'Loading...'
    });

    this.loading.present();

  }

  hideLoader() {
    this.loading.dismiss();
  }

  showToast(params) {
    let toast = this.toastCtrl.create(params);
    toast.present();
  }

  showAlert(title, text) {

      let alert = this.alertCtrl.create({
        title: title,
        message: text,
        buttons: ['OK']
      });
      alert.present();
  }
}
