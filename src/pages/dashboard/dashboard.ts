import {Component} from "@angular/core";
import {AlertController, NavController} from "ionic-angular";

import {NewCarPage} from "../new-car/new-car";
import {UtilitService} from "../../services/utilit-service";
import {CarProvider} from "../../providers/car/car";
import {AdminBookingsPage} from "../admin-bookings/admin-bookings";
import {AdminNotificationsPage} from "../admin-notifications/admin-notifications";


@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})

export class DashboardPage {

  public lists: any;
  public count: number;
  public searchHide: number = 0;

  constructor(public nav: NavController,
              public utilit: UtilitService,
              public carService: CarProvider,
              public alertCtrl: AlertController,
  ) {
  }

  ionViewWillEnter() {

    this.getList();

  }

  goToVehicles() {
    this.searchHide = 1;
  }

  goToBookings() {
    this.nav.push(AdminBookingsPage);
  }

  goToNoti() {
    this.nav.push(AdminNotificationsPage);
  }

  getList() {
    this.utilit.showLoader();

    this.carService.list().then((res) => {

      this.lists = res['msg'];
      this.count = this.lists.length;
      this.utilit.hideLoader();

    }, (err) => {
      this.utilit.hideLoader();
    });
  }

  goToEdit(eventId){
    this.nav.push(NewCarPage, { 'Id': eventId });
  }

  deleteVehicle(Id) {
    let confirm = this.alertCtrl.create({
      title: 'Delete Vehicle?',
      message: 'Are you sure want to delete vehicle?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {

          }
        },
        {
          text: 'OK',
          handler: () => {

            this.utilit.showLoader();

            this.carService.deleteVehicle({Id: Id}).then((res) => {

              this.utilit.hideLoader();
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

  addNew() {
    this.nav.push(NewCarPage);
  }

}

//
