import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Env} from "../../../config/env";

/*
  Generated class for the CarProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CarProvider {

  private url: string;

  constructor(public http: HttpClient, public env: Env) {
    this.url = env.baseURL;
  }

  addVehicle(details) {

    return new Promise((resolve, reject) => {

      let headers = new HttpHeaders();
      headers.set('Content-Type', 'application/json');

      this.http.post(this.url + '/addvehicle', details, {headers: headers})
        .subscribe(res => {

          console.log(res);

          resolve(res);

        }, (err) => {
          reject(err);
        });

    });

  };

  getVehicle(id) {
    return new Promise((resolve, reject) => {

      let headers = new HttpHeaders();
      headers.set('Content-Type', 'application/json');

      this.http.post(this.url + '/getvehicle', id, {headers: headers})
        .subscribe(res => {

          console.log(res);

          resolve(res);

        }, (err) => {
          reject(err);
        });

    });
  };

  deleteVehicle(id) {
    return new Promise((resolve, reject) => {

      let headers = new HttpHeaders();
      headers.set('Content-Type', 'application/json');

      this.http.post(this.url + '/deletevehicle', id, {headers: headers})
        .subscribe(res => {

          console.log(res);

          resolve(res);

        }, (err) => {
          reject(err);
        });

    });
  };

  list () {

    return new Promise((resolve, reject) => {

      let headers = new HttpHeaders();
      headers.set('Content-Type', 'application/json');

      this.http.get(this.url + '/vehicleslist', {headers: headers})
        .subscribe(res => {

          console.log(res);

          resolve(res);

        }, (err) => {
          reject(err);
        });

    });

  }
}
