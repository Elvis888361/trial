import { Injectable } from '@angular/core';
import { Station } from '../../interfaces/station';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class StationService {
  private station$: Observable<Station[]>;
  constructor(private http: HttpClient) {}

  getStations(): Observable<Station[]> {
    if (!this.station$) {
      this.station$ = this.http
        .get<any[]>(environment.getstations)
        .pipe(shareReplay());
    }
    //if  cache exist return it
    return this.station$;
  }
}
