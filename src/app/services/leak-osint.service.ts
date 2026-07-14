import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeakOsintService {

  private searchUrl = 'https://leakdatabackend.onrender.com/api/search/search';
  private couponUrl = 'https://leakdatabackend.onrender.com/api/search/check-coupon';
  // private token = '6516013858:SxqsmEjZ';

  constructor(private http: HttpClient) {}

  search(query: string): Observable<any> {
    return this.http.post(this.searchUrl, {
      query: query,
      limit: 100,
      lang: 'en'
    });
  }

  checkCoupon(coupon: string): Observable<any> {
    return this.http.post(this.couponUrl, {
      Coupon: coupon
    });
  }
}
