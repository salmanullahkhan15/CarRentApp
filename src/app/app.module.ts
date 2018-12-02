import {NgModule} from "@angular/core";
import {IonicApp, IonicModule} from "ionic-angular";
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {IonicStorageModule} from '@ionic/storage';
import {Camera} from '@ionic-native/camera';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {Keyboard} from '@ionic-native/keyboard';

import {SearchService} from "../services/search-service";
import {UtilitService} from "../services/utilit-service";

import {MyApp} from "./app.component";

import {SettingsPage} from "../pages/settings/settings";
import {BookingsPage} from "../pages/bookings/bookings";
import {HomePage} from "../pages/home/home";
import {LoginPage} from "../pages/login/login";
import {NotificationsPage} from "../pages/notifications/notifications";
import {AdminNotificationsPage} from "../pages/admin-notifications/admin-notifications";
import {RegisterPage} from "../pages/register/register";
import {RegisterOwnerPage} from "../pages/register-owner/register-owner";
import {DashboardPage} from "../pages/dashboard/dashboard";
import {SearchLocationPage} from "../pages/search-location/search-location";
import {BookingDetailPage} from "../pages/booking-detail/booking-detail";
import {ResultsPage} from "../pages/results/results";
import {AuthProvider} from '../providers/auth/auth';

import {AuthInterceptor} from "../providers/auth/auth.interceptor";
import {NewCarPage} from "../pages/new-car/new-car";
import {CarProvider} from '../providers/car/car';
import {Env} from "../../config/env";
import {BookedDetailsPage} from "../pages/booked-details/booked-details";
import {AdminBookingsPage} from "../pages/admin-bookings/admin-bookings";


@NgModule({
  declarations: [
    MyApp,
    SettingsPage,
    BookingsPage,
    AdminBookingsPage,
    HomePage,
    LoginPage,
    NotificationsPage,
    AdminNotificationsPage,
    RegisterPage,
    RegisterOwnerPage,
    DashboardPage,
    NewCarPage,
    SearchLocationPage,
    BookingDetailPage,
    BookedDetailsPage,
    ResultsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
      scrollPadding: false,
      scrollAssist: true,
      autoFocusAssist: false
    }),
    IonicStorageModule.forRoot({
      name: 'car_rent',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SettingsPage,
    BookingsPage,
    AdminBookingsPage,
    HomePage,
    LoginPage,
    NotificationsPage,
    AdminNotificationsPage,
    RegisterPage,
    RegisterOwnerPage,
    DashboardPage,
    NewCarPage,
    SearchLocationPage,
    BookingDetailPage,
    BookedDetailsPage,
    ResultsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Keyboard,
    SearchService,
    AuthProvider,
    UtilitService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    File,
    FileTransfer,
    FileTransferObject,
    Camera,
    CarProvider,
    Env
  ]
})

export class AppModule {
}
