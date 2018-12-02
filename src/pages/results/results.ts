import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {SearchService} from "../../services/search-service";
import {BookingDetailPage} from "../booking-detail/booking-detail";
import {HomePage} from "../home/home";
import {UtilitService} from "../../services/utilit-service";
import {Storage} from "@ionic/storage";

@Component({
  selector: 'page-results',
  templateUrl: 'results.html'
})
export class ResultsPage {

  public cars: any;
  public count: any = 0;
  public type: any;

  constructor(public nav: NavController,
              public searchService: SearchService,
              public storage: Storage,
              public utilit: UtilitService,
              public navParams: NavParams
  ) {
    this.type = this.navParams.data.type;
  }

  ionViewWillEnter() {
    this.storage.get('pickup').then((val) => {

      if (val) {

        this.utilit.showLoader();

        this.searchService.getAll({from: val['name'], type: this.type}).then((res) => {

          this.cars = res['msg'];
          this.count = this.cars.length;
          this.utilit.hideLoader();

        }, (err) => {
          this.utilit.hideLoader();
        });

      }

    }).catch((err) => {
      this.nav.push(HomePage);
    });
  }

  // view car detail
  viewDetail(id) {
    this.nav.push(BookingDetailPage, {id: id});
  }
}
