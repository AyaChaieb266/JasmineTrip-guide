import { Component, OnInit } from '@angular/core';
import {SecurityServiceService} from "../../services/security-service.service";
import {Router} from "@angular/router";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  UserById:any
  userConnect=JSON.parse(localStorage.getItem("userConnect"))

  constructor(private service_sec:SecurityServiceService,private router:Router) { }

  ngOnInit(): void {
    this.getUserById()
  }
  logout(){
    this.service_sec.logout().subscribe((res)=>{
      Swal.fire('logout successful')
      console.log("message" , res);
      if(res.message ==  "Log out successful!"){
        localStorage.clear()
      //  this.router.navigateByUrl("/")
      }
    })}

    
  isConnect(){
     return localStorage.getItem("state")=="0"?true:false
     //return localStorage.getItem("State") !== "1";


  }
  refreshPageWithDelay(): void {
    setTimeout(() => {
      window.location.reload();
    },500 );
  }

  getUserById(){
    this.service_sec.getUserById(this.userConnect.id).subscribe((res:any)=>{
      this.UserById=res
      console.log("user By Id",this.UserById);
      
    },)
  }


}

