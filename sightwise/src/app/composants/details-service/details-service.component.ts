import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailServiceService } from 'src/app/services/detail-service.service';





@Component({
  selector: 'app-details-service',
  templateUrl: './details-service.component.html',
  styleUrls: ['./details-service.component.css']
})
export class DetailsServiceComponent implements OnInit {
  listService:any
  attractionId:any
  attractionByid:any

  id = this.activeRoute.snapshot.params['id'];
  constructor(private service_svc:DetailServiceService,
    private service:DetailServiceService,
    private activeRoute : ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getServices()
    this.getAttrationByID()
    
  }

  refreshPageWithDelay(): void {
    setTimeout(() => {
      window.location.reload();
    }, );
  }

  getServices(){
    this.service_svc.getServiceByAttractionId(this.id).subscribe((res:any)=>{
      this.listService=res
      console.log("liste de reservation", this.listService);
      

    })
}
getAttrationByID(){
  this.service.getAttractionDetail(this.id).subscribe((res:any)=>{
    this.attractionByid = res
    
    console.log("Detail", this.attractionByid);
  })
}



}
