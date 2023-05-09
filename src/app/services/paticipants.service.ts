import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Participants } from '../models/participants';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {

  private base_Url = 'http://localhost:3000/api/v1/participants';

  constructor(private http: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Default Error Handling
      console.log(`An error occurred ${error.status}, body was: ${error.error}`);
    } else {
      // Unsuccessful Response Error Code returned from Backend
      console.log(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    // Return Observable with Error Message to Client
    return throwError('Something happened with request, please try again later.');
  }

  getParticipants(): Observable<Participants[]> {
    return this.http.get<Participants[]>(this.base_Url);
  }

  getParticipantByCenter(centerId: string): Observable<Participants[]> {
    return this.http.get<Participants[]>(`http://localhost:3000/api/v1/centers/${centerId}/participants`);
  }
  getList(): Observable<any> {
    return this.http.get(this.base_Url).pipe(retry(3), catchError(this.handleError));
  }

}