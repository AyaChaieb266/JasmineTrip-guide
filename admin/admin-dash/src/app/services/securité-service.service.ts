import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
//import { jwtDecode } from "jwt-decode"

@Injectable({
  providedIn: 'root'
})
export class SecuritéServiceService {

  constructor(private http:HttpClient) { }

  login(admin:any):Observable<any>{
     return this.http.post(`${environment.apiUrl}/SECURITY-SERVICE/auth/login`, admin)
   // return this.http.post(`http://localhost:8084/auth/login`, admin)

  }
  //Authorization
private httpheaders={
  headers:new HttpHeaders({
    'Authorization':`Bearer ${localStorage.getItem("token")}`
  })}

  logout():Observable<any>{
    return this.http.post(`${environment.apiUrl}/SECURITY-SERVICE/auth/signout`,{},this.httpheaders)
     }

    //  getUserById(userId: number): Observable<any> {
    //   return this.http.get<any>(`http://localhost:8084/user/getone/${userId}`);
    // }

    getUserByIdFromToken(id): Observable<any> {
     
      //return this.http.get<any>(`http://localhost:8084/user/getone/${id}`);
      return this.http.get<any>(`${environment.apiUrl}/SECURITY-SERVICE/user/getone/${id}`);
      
    }
    forgetPassword(email):Observable<any>{
      return this.http.post<any>(`${environment.apiUrl}/SECURITY-SERVICE/auth/forgetpassword`,email)

    }
    resetPassword(token,newPass):Observable <any>{
      return this.http.post<any>(`${environment.apiUrl}/SECURITY-SERVICE/auth//resetPassword/${token}`,newPass)

    
}
}

