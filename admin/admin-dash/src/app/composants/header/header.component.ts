import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SecuritéServiceService } from 'src/app/services/securité-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user:any
  userConnect=JSON.parse(localStorage.getItem("userConnect"))

  constructor(private service_sec:SecuritéServiceService,
              private router :Router,


  ) { }

  ngOnInit(): void {
    this.getUserById()
  }


  logout(){
    this.service_sec.logout().subscribe((res)=>{
      console.log("message" , res);
      if(res.message ==  "Log out successful!"){
        localStorage.clear()
       this.router.navigateByUrl("/")
      }




    })}
    getUserById(){
    this.service_sec.getUserByIdFromToken(this.userConnect.id).subscribe((res:any)=>{
        this.user = res
      console.log("Detail", this.user);


      })

    }

}
