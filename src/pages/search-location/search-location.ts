import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {Storage} from '@ionic/storage';
import {PLACES} from "../../services/mock-locations";

@Component({
  selector: 'page-search-location',
  templateUrl: 'search-location.html'
})

export class SearchLocationPage {
  public fromto: any;
  // places
  public places = {
    nearby: PLACES,
    recent: [
      {
        id: 1,
        name: "Lahore"
      }
    ]
  };

  constructor(private storage: Storage, public nav: NavController, public navParams: NavParams) {
    this.fromto = this.navParams.data;
  }

  // search by item
  searchBy(item) {
    if (this.fromto === 'from') {
      this.storage.set('pickup', item);
    }

    if (this.fromto === 'to') {
      this.storage.set('dropOff', item);
    }
    // this.nav.push(SearchCarsPage);
    this.nav.pop();
  }
}
