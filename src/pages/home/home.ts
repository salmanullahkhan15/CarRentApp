import {Component, ElementRef, ViewChild} from "@angular/core";
import {NavController, PopoverController} from "ionic-angular";
import {Storage} from '@ionic/storage';

import {NotificationsPage} from "../notifications/notifications";
import {SettingsPage} from "../settings/settings";
import {ResultsPage} from "../results/results";
import {SearchLocationPage} from "../search-location/search-location";
import {BookingsPage} from "../bookings/bookings";
import {TYPES} from "../../services/mock-vehicle-types";
import {SearchService} from "../../services/search-service";

declare let google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  @ViewChild('map') mapElement: ElementRef;
  public map: any;
  public directionsService = new google.maps.DirectionsService;
  public directionsDisplay = new google.maps.DirectionsRenderer;
  public searchHide: number = 0;
  public Types: object = TYPES;
  public notificationCount: number = 0;
  public loginUser: any;

  // search condition
  public search = {
    fromName: "From",
    toName: "Destination",
    type: "",
  };

  constructor(private storage: Storage,
              public nav: NavController,
              public popoverCtrl: PopoverController,
              public searchService: SearchService) {
  }

  ionViewDidLoad() {
    this.initMap();
  }

  ionViewWillEnter() {
    this.storage.get('pickup').then((val) => {
      if (val === null) {
        this.search.fromName = "From";
      } else {
        this.search.fromName = val.name;
        this.calculateAndDisplayRoute();
      }
    }).catch((err) => {
      console.log(err)
    });

    this.storage.get('dropOff').then((val) => {
      if (val === null) {
        this.search.toName = "Destination";
      } else {
        this.search.toName = val.name;
        this.calculateAndDisplayRoute();
      }
    }).catch((err) => {
      console.log(err)
    });

    this.storage.get('user').then((loginUser) => {

      this.loginUser = loginUser;
      this.searchService.notifications({user: this.loginUser.id}).then((res) => {
        this.notificationCount = res['msg'];
      }, (err) => {
        console.log(err)
      });

    }).catch((err) => {
      console.log(err)
    });

  }

  // go to result page
  doSearch() {
    this.nav.push(ResultsPage, {type: this.search.type});
  }

  // choose place
  choosePlace(from) {
    this.nav.push(SearchLocationPage, from);
  }

  // to go account page
  goToAccount() {
    this.nav.push(SettingsPage);
  }

  goToBookings() {
    this.nav.push(BookingsPage);
  }

  presentNotifications(myEvent) {

    this.searchService.notifications({user: this.loginUser.id}).then((res) => {
      this.notificationCount = res['msg'];
    }, (err) => {
      console.log(err)
    });

    let popover = this.popoverCtrl.create(NotificationsPage);
    popover.present({
      ev: myEvent
    });
  }

  bookNow() {
    this.searchHide = 1;
    this.calculateAndDisplayRoute();
  }

  initMap() {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 7,
      center: {lat: 33.738045, lng: 73.084488}
    });

    this.directionsDisplay.setMap(this.map);
  }

  calculateAndDisplayRoute() {
    this.directionsService.route({
      origin: this.search.fromName + ", Pakistan",
      destination: this.search.toName + ", Pakistan",
      travelMode: 'DRIVING',
    }, (response, status) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
        console.log(response);
      } else {
        console.log('Directions request failed due to ' + status);
      }
    });
  }

}
