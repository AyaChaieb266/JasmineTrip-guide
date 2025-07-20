import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiAdminServiceService {
  

  constructor(private http:HttpClient) { }

  allAttraction():Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/CATEGORY-SERVICE/attractions/all`)
}
// allAttraction():Observable<any>{
//   return this.http.get<any>(`http://localhost:8085/attractions/all`)
// }

allCategory():Observable<any>{
  return this.http.get<any>(`${environment.apiUrl}/CATEGORY-SERVICE/categories/all`)
}

// allCategory():Observable<any>{
//   return this.http.get<any>(`http://localhost:8085/categories/all`)
// }
getAttractionDetail(attractionId: any){
  return this.http.get<any>(`${environment.apiUrl}/CATEGORY-SERVICE/attractions/getone/${attractionId}`)
}
getCategoryDetail(id:any){
  return this.http.get<any>(`${environment.apiUrl}/CATEGORY-SERVICE/categories/getone/${id}`)
}

// getAttractionDetail(attractionId: any){
//   return this.http.get<any>(`http://localhost:8085/attractions/getone/${attractionId}`)
// }

getReservationById(attractionId: any){
  return this.http.get<any>(`${environment.apiUrl}/RESERVATION-SERVICE/reservations/allRes/${attractionId}`)
}
getCommentsById(attractionId:any){
  return this.http.get<any>(`${environment.apiUrl}/COMMENT-SERVICE/comments/allCom/${attractionId}`)
}

getAllReservation(){
  return this.http.get<any>(`${environment.apiUrl}/RESERVATION-SERVICE/reservations/all`)
}
getAllComments():Observable<any>{
  return this.http.get<any>(`${environment.apiUrl}/COMMENT-SERVICE/comments/all`)
}

// getAllComments():Observable<any>{
//   return this.http.get<any>(`http://localhost:8086/comments/all`)
// }

deleteAttraction(attractionId: any){
  return this.http.delete<any>(`${environment.apiUrl}/CATEGORY-SERVICE/attractions/delete/${attractionId}`)
}
// deleteAttraction(attractionId: any){
//   return this.http.delete<any>(`http://localhost:8085/attractions/delete/${attractionId}`)
// }

deleteCategory(cat_id:any){
  return this.http.delete<any>(`${environment.apiUrl}/CATEGORY-SERVICE/categories/delete/${cat_id}`)
}



addAttraction( attraction: any): Observable<any> {

  // const formData: FormData = new FormData();
  // for (let i = 0; i < files.length; i++) {
  //   formData.append('files', files[i]);
  // }
  //formData.append('attraction', JSON.stringify(attraction));
  
  return this.http.post<any>(`${environment.apiUrl}/CATEGORY-SERVICE/attractions/savelist`, attraction);
 
}

addAttrWithCategory(catId: number, attractionData: any) {
  
  return this.http.post<any>(`${environment.apiUrl}/CATEGORY-SERVICE/attractions/addAttrWithCategory/${catId}`, attractionData  );
}



putAttraction( cat_id:number,attractionId:number,newAttraction:any):Observable<any>{
  return this.http.put<any>(`${environment.apiUrl}/CATEGORY-SERVICE/attractions/updateCategory/${cat_id}/${attractionId}`, newAttraction);
}
// putAttraction( cat_id:number,attractionId:number,newAttraction:any):Observable<any>{
//   return this.http.put<any>(`http://localhost:8085/attractions/updateCategory/${cat_id}/${attractionId}`, newAttraction);
// }
// updateStatusReservation(reservation_id:number,newStatus:any):Observable<any>{
//   return this.http.get<any>(`${environment.apiUrl}/RESERVATION-SERVICE/reservations/statusRes/${reservation_id}`, newStatus);
// }
// updatestaus(id:any,status:any):Observable<any>{
//   return this.http.put<any>(`${environment.apiUrl}/RESERVATION-SERVICE/reservations/statusRes/${id}`,status)
// }

updatestaus(id: any, status: any): Observable<any> {
  return this.http.put<any>(`${environment.apiUrl}/RESERVATION-SERVICE/reservations/statusRes/${id}`, { status: status });
}

putCategory(id:number,newCategory:any):Observable<any>{
  return this.http.put<any>(`${environment.apiUrl}/CATEGORY-SERVICE/categories/update/${id}`,newCategory)
}



}
