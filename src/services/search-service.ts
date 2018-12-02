import {Injectable} from "@angular/core";
import {Env} from "../../config/env";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class SearchService {
  private url: string;

  constructor(public http: HttpClient, public env: Env) {
    this.url = env.baseURL;
  }

  getAll(from) {
    return new Promise((resolve, reject) => {

      let headers = new HttpHeaders();
      headers.set('Content-Type', 'application/json');

      this.http.post(this.url + '/getresults', from, {headers: headers})
        .subscribe(res => {

          console.log(res);

          resolve(res);

        }, (err) => {
          reject(err);
        });

    });
  }

  getItem(id) {
    return new Promise((resolve, reject) => {

      let headers = new HttpHeaders();
      headers.set('Content-Type', 'application/json');

      this.http.post(this.url + '/getvehicle', {Id: id}, {headers: headers})
        .subscribe(res => {

          console.log(res);

          resolve(res);

        }, (err) => {
          reject(err);
        });

    });
  }

  book(details) {
    return new Promise((resolve, reject) => {

      let headers = new HttpHeaders();
      headers.set('Content-Type', 'application/json');

      this.http.post(this.url + '/newbooking', details, {headers: headers})
        .subscribe(res => {

          console.log(res);

          resolve(res);

        }, (err) => {
          reject(err);
        });

    });
  }

  bookinglist(data) {
    return new Promise((resolve, reject) => {

      let headers = new HttpHeaders();
      headers.set('Content-Type', 'application/json');

      this.http.post(this.url + '/bookinglist', data || {}, {headers: headers})
        .subscribe(res => {

          console.log(res);

          resolve(res);

        }, (err) => {
          reject(err);
        });

    });
  }

  deleteBooking(id) {
    return new Promise((resolve, reject) => {

      let headers = new HttpHeaders();
      headers.set('Content-Type', 'application/json');

      this.http.post(this.url + '/deletebooking', id, {headers: headers})
        .subscribe(res => {

          console.log(res);

          resolve(res);

        }, (err) => {
          reject(err);
        });

    });
  }

  getBooking(id) {
    return new Promise((resolve, reject) => {

      let headers = new HttpHeaders();
      headers.set('Content-Type', 'application/json');

      this.http.post(this.url + '/getbooking', {Id: id}, {headers: headers})
        .subscribe(res => {

          console.log(res);

          resolve(res);

        }, (err) => {
          reject(err);
        });

    });
  }

  changeBookingStatus(data) {
    return new Promise((resolve, reject) => {

      let headers = new HttpHeaders();
      headers.set('Content-Type', 'application/json');

      this.http.post(this.url + '/bookingstatus', data, {headers: headers})
        .subscribe(res => {

          console.log(res);

          resolve(res);

        }, (err) => {
          reject(err);
        });

    });
  }

  notificationslist(data) {
    return new Promise((resolve, reject) => {

      let headers = new HttpHeaders();
      headers.set('Content-Type', 'application/json');

      this.http.post(this.url + '/notificationslist', data || {}, {headers: headers})
        .subscribe(res => {

          console.log(res);

          resolve(res);

        }, (err) => {
          reject(err);
        });

    });
  }

  notifications(data) {
    return new Promise((resolve, reject) => {

      let headers = new HttpHeaders();
      headers.set('Content-Type', 'application/json');

      this.http.post(this.url + '/notificationscount', data, {headers: headers})
        .subscribe(res => {

          console.log(res);

          resolve(res);

        }, (err) => {
          reject(err);
        });

    });
  }

  readNotification(id) {
    if(!id) return;

    return new Promise((resolve, reject) => {

      let headers = new HttpHeaders();
      headers.set('Content-Type', 'application/json');

      this.http.post(this.url + '/readnotification', {id: id}, {headers: headers})
        .subscribe(res => {

          console.log(res);

          resolve(res);

        }, (err) => {
          reject(err);
        });

    });
  }
}
