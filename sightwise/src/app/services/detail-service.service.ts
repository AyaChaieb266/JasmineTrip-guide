import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DetailServiceService {

 

  constructor(private http:HttpClient) { }



  allAttraction():Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/CATEGORY-SERVICE/attractions/all`)
}



allCategory():Observable<any>{
  return this.http.get<any>(`${environment.apiUrl}/CATEGORY-SERVICE/categories/all`)
  }

 

  getAttractionDetail(attractionId: any){
    return this.http.get<any>(`${environment.apiUrl}/CATEGORY-SERVICE/attractions/getone/${attractionId}`)
  }

getServiceByAttractionId(attractionId:any){
  return this.http.get<any>(`${environment.apiUrl}/CATEGORY-SERVICE/services/svc/${attractionId}`)
}
}
