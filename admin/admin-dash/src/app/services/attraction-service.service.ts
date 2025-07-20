import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AttractionServiceService {

  constructor(private http:HttpClient) { }

  getAverageRating(attractionId: number): Observable<number> {
    return this.http.get<number>(`${environment.apiUrl}/COMMENT-SERVICE/comments/moyenne/${attractionId}`);
  }

  getAttractionDetail(attractionId: any){
    return this.http.get<any>(`${environment.apiUrl}/CATEGORY-SERVICE/attractions/getone/${attractionId}`)
  }

 
   addCategorie(categoriData:any){
    return this.http.post<any>(`${environment.apiUrl}/CATEGORY-SERVICE/categories/save`,categoriData)

   }

   getService(attractionId:any){
    return this.http.get<any>(`${environment.apiUrl}CATEGORY-SERVICE/services/svc/${attractionId}`)
   }
}
