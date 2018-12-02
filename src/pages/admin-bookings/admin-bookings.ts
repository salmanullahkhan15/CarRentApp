import {Component} from "@angular/core";
import {AlertController, NavController} from "ionic-angular";
import {SearchService} from "../../services/search-service";
import {UtilitService} from "../../services/utilit-service";
import {BookedDetailsPage} from "../booked-details/booked-details";
import {STATUS} from "../../services/mock-status";

@Component({
  selector: 'page-admin-bookings-trip',
  templateUrl: 'admin-bookings.html'
})
export class AdminBookingsPage {

  public count: number = 0;
  public bookings: any;
  public status: object = STATUS;

  constructor(public nav: NavController,
              public searchService: SearchService,
              public utilit: UtilitService,
              public alertCtrl: AlertController,) {

    this.getList();
  }

  getList() {
    this.utilit.showLoader();

    this.searchService.bookinglist({admin: true}).then((res) => {

      this.bookings = res['msg'];
      this.count = this.bookings.length;
      this.utilit.hideLoader();

    }, (err) => {
      this.utilit.hideLoader();
    });
  }

  // view car detail
  viewDetail(id) {
    this.nav.push(BookedDetailsPage, {id: id});
  }
}
