import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SecurityServiceService {

  constructor(private http:HttpClient, private router:Router) { }



  login(tourist:any):Observable<any>{
    // return this.http.post(`${environment.apiUrl}/SECURITY-SERVICE/auth/login`, admin)
    //return this.http.post(`http://localhost:8084/auth/login`, tourist)
    return this.http.post(`${environment.apiUrl}/SECURITY-SERVICE/auth/login`, tourist)

  }

  Register(tourist:any):Observable<any>{
    // return this.http.post(`${environment.apiUrl}/auth/signup`,tourist)
    return this.http.post(`${environment.apiUrl}/SECURITY-SERVICE/tourists/signup`,tourist)
  }
  getAllUser():Observable<any>{
   // return this.http.get<any>(`http://localhost:8084/user/all`)
    return this.http.get<any>(`${environment.apiUrl}/SECURITY-SERVICE/user/all`)
  }
  getUserById(id):Observable<any>{
    return this.http.get(`${environment.apiUrl}/SECURITY-SERVICE/user/getone/${id}`)
    //return this.http.get(`http://localhost:8084/user/getone/${id}`)
  }

  // private httpheaders={
  //   headers:new HttpHeaders({
  //     'Authorization':`Bearer ${localStorage.getItem("token")}`
  //   })}
  logout():Observable<any>{
    // return this.http.post(`http://localhost:8084/auth/signout`,{},this.httpheaders)
    return this.http.post(`${environment.apiUrl}/SECURITY-SERVICE/auth/signout`,{})
  }
  forgetPassword(email):Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}/SECURITY-SERVICE/auth/forgetpassword`,email)

  }
  resetPassword(token,newPass):Observable <any>{
    return this.http.post<any>(`${environment.apiUrl}/SECURITY-SERVICE/auth//resetPassword/${token}`,newPass)

  
}


getJwtToken(){
  return localStorage.getItem('token')
}
refreshToken(){
    let refreshToken= localStorage.getItem("refreshtoken")
  return this.http.post(`${environment.apiUrl}/SECURITY-SERVICE/auth/refreshtoken`,refreshToken)
}
logoutt(){
  localStorage.clear()
  this.router.navigateByUrl('/login');
}
}
