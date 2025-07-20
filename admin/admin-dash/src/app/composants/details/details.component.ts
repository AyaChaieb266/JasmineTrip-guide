import { Component, OnInit } from '@angular/core';
import { AdminDetailAtrComponent } from '../admin-detail-atr/admin-detail-atr.component';
import { ActivatedRoute } from '@angular/router';
import { ApiAdminServiceService } from 'src/app/services/api-admin-service.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  attractionByid:any
  reservationByIdAttraction:any
  commentByIdAttraction:any
 
 //prendre id de url
  id=this.activeRoute.snapshot.params["id"]
  constructor(private service:ApiAdminServiceService, private activeRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.getAttractionDetail()
    this.getReservationByIdAttraction()
    this.getCommentByIdAttraction()
    
   
  }
  getAttractionDetail(){
    this.service.getAttractionDetail(this.id).subscribe((res:any)=>{
      this.attractionByid = res
      console.log("Detail", this.attractionByid);
    })
  }

  getReservationByIdAttraction(){
    this.service.getReservationById(this.id).subscribe((res:any)=>{
      this.reservationByIdAttraction =res
      console.log("attraction Reservations ", this.reservationByIdAttraction);
      
    })
  }
  getCommentByIdAttraction(){
    this.service.getCommentsById(this.id).subscribe((res:any)=>{
      this.commentByIdAttraction= res
      console.log("attraction comments ", this.commentByIdAttraction);
      
    })
  }
 
 
  


}
