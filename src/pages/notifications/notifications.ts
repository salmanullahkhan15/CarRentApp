import {Component} from "@angular/core";
import {NavController, ViewController} from "ionic-angular";
import {SearchService} from "../../services/search-service";
import {UtilitService} from "../../services/utilit-service";
import {Storage} from "@ionic/storage";
import {BookedDetailsPage} from "../booked-details/booked-details";

@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html'
})

export class NotificationsPage {

  public notifications: any;
  public count: number = 0;
  public loginUser: any;

  constructor(public viewCtrl: ViewController,
              public searchService: SearchService,
              public utilit: UtilitService,
              public storage: Storage,
              public nav: NavController,
  ) {
  }

  ionViewDidLoad() {
    this.storage.get('user').then((loginUser) => {
      this.loginUser = loginUser;
      this.getList();
    }).catch((err) => {
      console.log(err)
    });
  }

  getList() {

    this.searchService.notificationslist({user: this.loginUser.id}).then((res) => {

      this.notifications = res['msg'];
      this.count = this.notifications.length;

    }, (err) => {
      this.utilit.hideLoader();
    });
  }

  itemSelected(item) {
    this.nav.push(BookedDetailsPage, {id: item.booking, nId: item._id})
    this.close();
  }

  close() {
    this.viewCtrl.dismiss();
  }
}
