import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TouristServiceService {

  constructor(private http:HttpClient) { }

  getAllTourist():Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/SECURITY-SERVICE/tourists/all`)
  }

  deleteTourist(id):Observable<any>{
    return this.http.delete<any>(`${environment.apiUrl}/SECURITY-SERVICE/tourists/deleteTRC/${id}`)
  }
  getAllUser():Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/SECURITY-SERVICE/auth/all}`)
  }
}
