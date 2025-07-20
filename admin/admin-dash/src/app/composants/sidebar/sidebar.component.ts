import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { buffer } from 'rxjs';
import { ApiAdminServiceService } from 'src/app/services/api-admin-service.service';
import { SecuritéServiceService } from 'src/app/services/securité-service.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  user : any
  


  constructor(private service_sec:SecuritéServiceService) { }

  ngOnInit(): void {
   

    
  }


 
  
 
}
