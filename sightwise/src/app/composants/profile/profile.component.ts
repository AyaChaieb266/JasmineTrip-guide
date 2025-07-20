import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SecurityServiceService } from 'src/app/services/security-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userConnect=JSON.parse(localStorage.getItem("userConnect"))
  UserById:any

  constructor(private service_sec:SecurityServiceService,private activeRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.getUserById()
  }
  getUserById(){
    this.service_sec.getUserById(this.userConnect.id).subscribe((res:any)=>{
      this.UserById=res
      console.log("user By Id",this.UserById);
      
    },)
  }
  refreshPageWithDelay(): void {
    setTimeout(() => {
      window.location.reload();
    },100);
  }
}
