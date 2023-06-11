import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';
import { Message } from '../interfaces/message';
import { Customer } from '../interfaces/customer';

@Injectable({
  providedIn: 'root',
})
export class SmsService {
  private sms$: Observable<any[]>;
  private message$: Observable<Message[]>;
  private customer$: Observable<Customer[]>;
  constructor(private http: HttpClient) {}

  getSmsData(): Observable<any[]> {
    if (!this.sms$) {
      this.sms$ = this.http.get<any[]>(environment.smsdata).pipe(shareReplay());
    }
    //if  cache exist return it
    return this.sms$;
  }

  getMessages(): Observable<Message[]> {
    if (!this.message$) {
      this.message$ = this.http
        .get<Message[]>(environment.getmessages)
        .pipe(shareReplay());
    }
    //if  cache exist return it
    return this.message$;
  }

  sendMessages(formdata): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    };
    return this.http.post(environment.sendsms, formdata, httpOptions);
  }

  uploadCustomers(formData: FormData) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    const httpOptions = { headers: headers };

    return this.http.post(
      environment.uploadmpesacustomers,
      formData,
      httpOptions
    );
  }

  getCustomers(): Observable<Customer[]> {
    if (!this.customer$) {
      this.customer$ = this.http
        .get<Customer[]>(environment.getmpesacustomers)
        .pipe(shareReplay());
    }
    //if  cache exist return it
    return this.customer$;
  }
}
