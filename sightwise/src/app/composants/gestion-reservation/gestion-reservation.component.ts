import { Component, OnInit } from '@angular/core';
import { ReservationServiceService } from 'src/app/services/reservation-service.service';

@Component({
  selector: 'app-gestion-reservation',
  templateUrl: './gestion-reservation.component.html',
  styleUrls: ['./gestion-reservation.component.css']
})
export class GestionReservationComponent implements OnInit {
  listtReservation:any
  userConnect=JSON.parse(localStorage.getItem("userConnect"))

  constructor(private service_res :ReservationServiceService) { }

  ngOnInit(): void {
    this.getAllreservation()
  }
//Gestion des reservation d'utilisateur connecté
  getAllreservation(){
    this.service_res.getAllReservation().subscribe((res:any)=>{
      this.listtReservation=res.filter((e:any) => e.tourist.id == this.userConnect.id)
      console.log("list Reservation est", this.listtReservation);
      
    })
  }

}
