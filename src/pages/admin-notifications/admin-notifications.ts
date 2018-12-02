import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {SearchService} from "../../services/search-service";
import {UtilitService} from "../../services/utilit-service";
import {Storage} from "@ionic/storage";
import {BookedDetailsPage} from "../booked-details/booked-details";

@Component({
  selector: 'page-admin-notifications',
  templateUrl: 'admin-notifications.html'
})
export class AdminNotificationsPage {
  // list of notifications
  public notifications: any;
  public count: number = 0;
  public loginUser: any;

  constructor(public nav: NavController,
              public searchService: SearchService,
              public utilit: UtilitService,
              public storage: Storage,
  ) {
    this.storage.get('user').then((loginUser) => {
      this.loginUser = loginUser;
      this.getList();
    }).catch((err) => {
      console.log(err)
    });

  }

  getList() {

    console.log(this.loginUser);
    this.utilit.showLoader();

    this.searchService.notificationslist({user: this.loginUser.id}).then((res) => {

      this.notifications = res['msg'];
      this.count = this.notifications.length;
      this.utilit.hideLoader();

    }, (err) => {
      this.utilit.hideLoader();
    });
  }

  itemSelected(item) {
    this.nav.push(BookedDetailsPage, {id: item.booking, nId: item._id})
  }

}
