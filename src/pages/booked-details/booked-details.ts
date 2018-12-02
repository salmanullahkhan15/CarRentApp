import {Component} from "@angular/core";
import {AlertController, NavController, NavParams} from "ionic-angular";
import {SearchService} from "../../services/search-service";
import {UtilitService} from "../../services/utilit-service";
import {Storage} from "@ionic/storage";
import {PLACES} from "../../services/mock-locations";
import {HomePage} from "../home/home";
import {DashboardPage} from "../dashboard/dashboard";
import {STATUS} from "../../services/mock-status";

@Component({
  selector: 'page-booked-details',
  templateUrl: 'booked-details.html'
})
export class BookedDetailsPage {
  // booking info
  public booking: any = {};
  public company: any = {};
  public car: any = {};
  public customer: any = {};
  public from: any = {};
  public to: any = {};
  public date = new Date().toISOString();
  public places: any = PLACES;
  public loginUser: any = {};
  public bookingStatus: number;
  //public status : any = {0: 'pending', 1: 'started', 2: 'completed', 3: 'cancel'};
  public status: any = {};

  constructor(public nav: NavController,
              public searchService: SearchService,
              public navParams: NavParams,
              public utilit: UtilitService,
              public storage: Storage,
              public alertCtrl: AlertController,) {

    this.utilit.showLoader();

    this.searchService.getBooking(this.navParams.get('id')).then((res) => {

      this.utilit.hideLoader();
      this.booking = res['msg'];
      this.company = this.booking.car_owner;
      this.customer = this.booking.user;
      this.car = this.booking.car;
      this.bookingStatus = this.booking.status;
      this.status = {
        color: STATUS[this.bookingStatus].color,
        name: STATUS[this.bookingStatus].name,
      };

      console.log(this.status);

    }, (err) => {
      this.utilit.hideLoader();
    });

    this.searchService.readNotification(this.navParams.get('nId'));

    this.storage.get('user').then((loginUser) => {
      this.loginUser = loginUser;
    }).catch((err) => {
      console.log(err)
    });
  }

  ionViewWillEnter() {

  }

  getPlace(id) {
    for (let i = 0; i < this.places.length; i++) {
      if (this.places[i].id === parseInt(id)) {
        return this.places[i].name;
      }
    }
    return null;
  }

  deleteBooking(Id) {
    let confirm = this.alertCtrl.create({
      title: 'Delete Booking?',
      message: 'Are you sure want to delete booking?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {

          }
        },
        {
          text: 'OK',
          handler: () => {

            this.searchService.deleteBooking({Id: Id}).then((res) => {

              this.utilit.showToast({
                message: res['msg'],
                duration: 2000,
                position: 'bottom',
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

  onSubmit() {
    if (this.bookingStatus) {
      this.utilit.showLoader();

      this.searchService.changeBookingStatus({
        status: this.bookingStatus,
        discount: this.booking.discount,
        Id: this.booking._id,
        car: this.car._id
      }).then((res) => {

        this.utilit.hideLoader();

        this.utilit.showToast({
          message: res['msg'],
          duration: 2000,
          position: 'bottom',
        });

        this.nav.setRoot(DashboardPage);
      }, (err) => {
        this.utilit.hideLoader();
      });
    }
  }
}
