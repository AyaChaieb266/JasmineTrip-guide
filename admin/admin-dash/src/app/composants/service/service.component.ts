import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiAdminServiceService } from 'src/app/services/api-admin-service.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {
  listAttraction:any
  p: number;
  term:any;
  attractionByid:any

  id=this.activeRoute.snapshot.params["id"]
  constructor(private service:ApiAdminServiceService,
    private activeRoute : ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getAllAttraction()
    this.getAttrationByID()
  }

  getAllAttraction(){
    this.service.allAttraction().subscribe((res:any)=>{
      this.listAttraction=res
      console.log("liste d'attraction", this.listAttraction);
      
    })
  }
  getAttrationByID(){
    this.service.getAttractionDetail(this.id).subscribe((res:any)=>{
      this.attractionByid = res
      console.log("Detail", this.attractionByid);
    })
  }

}
