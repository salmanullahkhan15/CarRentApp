import {Component} from "@angular/core";
import {AlertController, NavController, NavParams} from "ionic-angular";
import {SearchService} from "../../services/search-service";
import {UtilitService} from "../../services/utilit-service";
import {Storage} from "@ionic/storage";
import {HomePage} from "../home/home";

@Component({
  selector: 'page-booking-detail',
  templateUrl: 'booking-detail.html'
})
export class BookingDetailPage {
  // booking info
  public car: any = {};
  public company: any = {};
  public from: any = {};
  public to: any = {};
  public price: number = 0;
  public noOfDays = 1;
  public driverPrice: number = 0;
  public date = new Date().toISOString();

  constructor(public nav: NavController,
              public searchService: SearchService,
              public navParams: NavParams,
              public utilit: UtilitService,
              public storage: Storage,
              public alertCtrl: AlertController,) {
    this.utilit.showLoader();

    this.searchService.getItem(this.navParams.get('id')).then((res) => {

      this.utilit.hideLoader();
      this.car = res['msg'];
      this.company = this.car.by;

    }, (err) => {
      this.utilit.hideLoader();
    });
  }

  ionViewWillEnter() {
    this.storage.get('pickup').then((val) => {
      this.from = val;
    }).catch((err) => {
      console.log(err)
    });

    this.storage.get('dropOff').then((val) => {
      this.to = val;
    }).catch((err) => {
      console.log(err)
    });
  }

  // minus days when click minus button
  minusDays() {
    this.noOfDays--;
  }

  // plus days when click plus button
  plusDays() {
    this.noOfDays++;
  }

  driver(event) {
    if (event.checked) {
      this.driverPrice = this.car.driver_price;
    } else {
      this.driverPrice = 0;
    }
  }

  // go to checkout page
  checkout() {
    let confirm = this.alertCtrl.create({
      title: 'Confirm booking?',
      message: 'Please be sure every thing correct before booking?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {

          }
        },
        {
          text: 'Book',
          handler: () => {

            this.utilit.showLoader();

            if(this.from.id == this.to.id) {
              this.price = this.car.city_price;
            } else {
              this.price = this.car.other_price;
            }

            this.searchService.book({
              car_owner: this.company._id,
              car: this.car._id,
              from: this.from.id,
              to: this.to.id,
              booking_date: this.date,
              noOfDays: this.noOfDays,
              driverPrice: this.driverPrice,
              total: (this.noOfDays * this.price) + (this.driverPrice * this.noOfDays),
            }).then((res) => {

              this.utilit.hideLoader();

              this.utilit.showToast({
                message: res['msg'],
                duration: 3000,
                showCloseButton: true,
                cssClass: 'common-bg',
                position: 'top',
              });
              this.nav.setRoot(HomePage);

            }, (err) => {
              this.utilit.hideLoader();
            });

          }
        }
      ]
    });
    confirm.present();
  }
}
