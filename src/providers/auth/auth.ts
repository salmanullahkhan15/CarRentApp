import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Storage} from '@ionic/storage';
import 'rxjs/add/operator/map';
import {Env} from "../../../config/env";

@Injectable()
export class AuthProvider {

  public token: any;
  private url: string;
  public user: any = {};

  constructor(public http: HttpClient, public storage: Storage, public env: Env) {
    this.url = env.baseURL;
  }

  checkAuthentication() {

    return new Promise((resolve, reject) => {

      this.storage.get('user').then((user) => {
        this.user = user;
      });

      //Load token if exists
      this.storage.get('token').then((value) => {

        this.token = value;

        let headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json');
        headers.set('Authorization', this.token);

        this.http.get(this.url + '/protected', {headers: headers})
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });

      });

    });

  }

  createAccount(details) {

    return new Promise((resolve, reject) => {

      let headers = new HttpHeaders();
      headers.set('Content-Type', 'application/json');

      this.http.post(this.url + '/adduser', details, {headers: headers})
        .subscribe(res => {

          console.log(res);
          let data = res;
          this.token = data['token'];
          this.storage.set('token', data['token']);
          this.storage.set('user', data['user']);
          this.user = data['user'];
          resolve(data);

        }, (err) => {
          reject(err);
        });

    });

  }

  login(credentials) {

    return new Promise((resolve, reject) => {

      let headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');

      this.http.post(this.url + '/authenticate', credentials, {headers: headers})
        .subscribe(res => {

          let data = res;
          this.token = data['token'];
          this.storage.set('token', data['token']);
          this.storage.set('user', data['user']);
          this.user = data['user'];

          resolve(data);
        }, (err) => {
          reject(err);
        });

    });

  }

  getProfile(data) {
    return new Promise((resolve, reject) => {

      let headers = new HttpHeaders();
      headers.set('Content-Type', 'application/json');

      this.http.post(this.url + '/getuser', data, {headers: headers})
        .subscribe(res => {

          console.log(res);

          resolve(res);

        }, (err) => {
          reject(err);
        });

    });
  }

  updateProfile(data) {
    return new Promise((resolve, reject) => {

      let headers = new HttpHeaders();
      headers.set('Content-Type', 'application/json');

      this.http.post(this.url + '/updateuser', data, {headers: headers})
        .subscribe(res => {

          console.log(res);

          resolve(res);

        }, (err) => {
          reject(err);
        });

    });
  }

  logout() {
    this.storage.remove('token');
    this.storage.remove('user');
    this.user = {};
  }

  getToken() {
    return this.token;
  }
}
