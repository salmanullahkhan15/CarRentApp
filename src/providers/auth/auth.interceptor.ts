import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { AuthProvider} from "./auth";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(public auth: AuthProvider) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
        'Content-Type' : 'application/json; charset=utf-8',
        'Accept'       : 'application/json',
        'Authorization': `${this.auth.getToken()}`,
      },
    });

    return next.handle(req);
  }
}
