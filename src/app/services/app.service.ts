import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, debounceTime } from 'rxjs/operators';

import { Response, Status } from '../models/response.model';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';

@Injectable()
export class AppService {
  private campaignUuid = '46aa3270-d2ee-11ea-a9f0-e9a68ccff42a';

  constructor(private http: HttpClient) {}

  public checkEmailExist(email: string): Observable<boolean> {
    const payload = {
      campaignUuid: this.campaignUuid,
      data: {
        email: email,
      },
    };
    return this.http
      .post<Response>(`${environment.apiBaseUrl}/check-user`, payload)
      .pipe(
        debounceTime(400),
        map((response) => {
          if (response.data.status === Status.OK) {
            return false;
          }
          return true;
        }),
        catchError((_) => of(true))
      );
  }

  public signup(user: User): Observable<Response> {
    const payload = {
      campaignUuid: this.campaignUuid,
      data: user,
    };
    return this.http.post<Response>(`${environment.apiBaseUrl}/signup`, payload);
  }
}
