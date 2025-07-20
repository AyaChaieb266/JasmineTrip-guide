import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentaireServiceService {

  constructor(private http:HttpClient) { }

  getAllComments():Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/COMMENT-SERVICE/comments/all`)
  }
  getCommentsById(touristId:any){
    return this.http.get<any>(`${environment.apiUrl}/COMMENT-SERVICE/comments/allCom/${touristId}`)
  }
 deleteCommentById(commentId:any){
  return this.http.delete<any>(`${environment.apiUrl}/COMMENT-SERVICE/comments/delete/${commentId}`)
 }

}
