import {Component, ViewChild} from "@angular/core";
import {Platform, Nav, Events} from "ionic-angular";

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {Keyboard} from '@ionic-native/keyboard';

import {HomePage} from "../pages/home/home";
import {DashboardPage} from "../pages/dashboard/dashboard";
import {LoginPage} from "../pages/login/login";
import {AuthProvider} from "../providers/auth/auth";

import {AdminNotificationsPage} from "../pages/admin-notifications/admin-notifications";
import {BookingsPage} from "../pages/bookings/bookings";
import {SettingsPage} from "../pages/settings/settings";
import {AdminBookingsPage} from "../pages/admin-bookings/admin-bookings";
import {NewCarPage} from "../pages/new-car/new-car";

export interface MenuItem {
  title: string;
  component: any;
  icon: string;
}

export interface UserInfo {
  id: string;
  name: string;
  role: string;
  company: string;
}

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  appMenuItems: Array<MenuItem>;

  appUserInfo: UserInfo;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public keyboard: Keyboard,
              public auth: AuthProvider,
              public events: Events,) {

    events.subscribe('user:login', (user, time) => {
      console.log('Welcome: ' + time);
      this.setMenu(user);
    });

    this.initializeApp();
    this.setMenu(this.auth.user);

  }

  setMenu(user) {

    this.appUserInfo = user;

    if (this.appUserInfo.role == 'owner') {
      this.appMenuItems = [
        {title: 'Dashboard', component: DashboardPage, icon: 'home'},
        {title: 'Your Bookings', component: AdminBookingsPage, icon: 'list'},
        {title: 'Add Vehicle', component: NewCarPage, icon: 'car'},
        {title: 'Notifications', component: AdminNotificationsPage, icon: 'notifications'},
      ];
    } else {
      this.appMenuItems = [
        {title: 'Home', component: HomePage, icon: 'home'},
        {title: 'Your Bookings', component: BookingsPage, icon: 'list'},
        {title: 'Notifications', component: AdminNotificationsPage, icon: 'notifications'},
      ];
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.

      //*** Control Splash Screen
      this.splashScreen.show();
      this.splashScreen.hide();

      //*** Control Status Bar
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(false);

      //*** Control Keyboard
      this.keyboard.disableScroll(true);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout() {
    this.auth.logout();
    this.nav.setRoot(LoginPage);
  }

  gotToSettings() {
    this.nav.push(SettingsPage);
  }

}
