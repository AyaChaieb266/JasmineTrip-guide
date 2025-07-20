import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceCommentaireService {

  constructor(private http:HttpClient) { }

  getAllComments():Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/COMMENT-SERVICE/comments/all`)
  }
  getCommentsById(attractionId:any){
    return this.http.get<any>(`${environment.apiUrl}/COMMENT-SERVICE/comments/allCom/${attractionId}`)
  }
  addCommentByAtractionId(attractionId:any,commentData:any){
    return this.http.post<any>(`${environment.apiUrl}/COMMENT-SERVICE/comments/ajout/${attractionId}`,commentData)
  }

  touristCommentAtraction(attractionId:any,touristId:any,commentData:any){
    return this.http.post<any>(`${environment.apiUrl}/COMMENT-SERVICE/comments/commenter/${attractionId}/${touristId}`,commentData)
  }
  getAverageRating(attractionId: number): Observable<number> {
    return this.http.get<number>(`${environment.apiUrl}/COMMENT-SERVICE/comments/moyenne/${attractionId}`);
  }
  
  addAverageRating(attractionId: number,content:any): Observable<number> {
    return this.http.post<number>(`${environment.apiUrl}/COMMENT-SERVICE/comments/ajout/${attractionId}`,content);
  }
}
