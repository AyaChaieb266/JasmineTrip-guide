import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AttractionServiceService {

  constructor(private http:HttpClient) { }
  allCategory():Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/CATEGORY-SERVICE/categories/all`)
    }

  allAttraction():Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/CATEGORY-SERVICE/attractions/all`)
}

getAttractionDetail(attractionId: any){
  return this.http.get<any>(`${environment.apiUrl}/CATEGORY-SERVICE/attractions/getone/${attractionId}`)
}
getAttractionByCategory(categoryId:any):Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/CATEGORY-SERVICE/attractions/attractionsByCategory/${categoryId}`)
}


}
