import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Intercepting request:', req);
    if (req.method === 'POST') {
      const newRequest = req.clone({ headers: new HttpHeaders({ token: '123445vfzasdad' }) });
      return next.handle(newRequest);
    }
    return next.handle(req);
  }
}
