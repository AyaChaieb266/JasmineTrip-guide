import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservationServiceService {

  constructor(private http: HttpClient) { }

  addReservationByAtractionId(attractionId:any,touristId:any,reservationData:any){
   // return this.http.post<any>(`http://localhost:8087/reservations/ajout/${attractionId}`,reservationData)
    return this.http.post<any>(`${environment.apiUrl}/RESERVATION-SERVICE/reservations/${attractionId}/${touristId}`,reservationData)
  }
  getAllReservation(){
    return this.http.get<any>(`${environment.apiUrl}/RESERVATION-SERVICE/reservations/all`)
  }

  createReservation(attractionId: any, idtourist:any,serviceIds: any[], reservation: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/RESERVATION-SERVICE/reservations/${ attractionId}/${idtourist}?serviceIds=${serviceIds}`, reservation);
  }
}
