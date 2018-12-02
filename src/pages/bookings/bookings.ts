import {Component} from "@angular/core";
import {AlertController, NavController} from "ionic-angular";
import {SearchService} from "../../services/search-service";
import {UtilitService} from "../../services/utilit-service";
import {BookedDetailsPage} from "../booked-details/booked-details";
import {STATUS} from "../../services/mock-status";
import {PLACES} from "../../services/mock-locations";

@Component({
  selector: 'page-bookings-trip',
  templateUrl: 'bookings.html'
})
export class BookingsPage {

  public count : number = 0;
  public bookings : any;
  public status: object = STATUS;
  public places: any = PLACES;

  constructor(public nav: NavController,
              public searchService: SearchService,
              public utilit: UtilitService,
              public alertCtrl: AlertController,
  ) {

    this.getList();
  }

  getList() {
    this.utilit.showLoader();

    this.searchService.bookinglist({admin: false}).then((res) => {

      this.bookings = res['msg'];
      this.count = this.bookings.length;
      this.utilit.hideLoader();

    }, (err) => {
      this.utilit.hideLoader();
    });
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

              this.getList();

              this.utilit.showToast({
                message: res['msg'],
                duration: 2000,
                position: 'bottom',
              });

            }, (err) => {
              this.utilit.hideLoader();
            });

          }
        }
      ]
    });
    confirm.present();
  }

  // view car detail
  viewDetail(id) {
    this.nav.push(BookedDetailsPage, {id: id});
  }

  getPlace(id) {
    for (let i = 0; i < this.places.length; i++) {
      if (this.places[i].id === parseInt(id)) {
        return this.places[i].name;
      }
    }
    return null;
  }
}
