import { Component, OnInit } from '@angular/core';
import { ApiAdminServiceService } from '../../services/api-admin-service.service';
import { Observable } from 'rxjs';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  listReservation : any
  p:number=1;
  newStatus: any
  //status: any
  reservation_id: number
  

  constructor( private formBuilder:FormBuilder, private service:ApiAdminServiceService,
    ) { }

  ngOnInit(): void {
    this.getReservation()
    
   
    }
    getReservation(){
      this.service.getAllReservation().subscribe((res:any)=>{
        this.listReservation=res
        console.log("liste de reservation", this.listReservation);
        

      })
  }
  // updateStatusReservation(reservation_id:number,newStatus:any) {
  //   this.service.updateStatusReservation(reservation_id,newStatus).subscribe((res:any)=>{
  //     if (this.newStatus === "REFUSED") {
  //       this.newStatus='REFUSED'
  //       console.log("status",this.newStatus);
        
  //     } else {
  //       if ( this.newStatus='APPROVED'){
  //         this.newStatus == 'APPROVED'
  //         console.log("status",this.newStatus);
  //       }
       
  //     }
  //     this.newStatus=res
  //     console.log("Status Updated ", this.newStatus);
      

  //   })

  // }
  upstatus(reservationId: number, newStatus: string) {
    this.service.updatestaus(reservationId, newStatus)
      .subscribe((res:any )=> {
        console.log('Reservation updated successfully:', res);
        this.getReservation()
        // Mettez à jour votre vue si nécessaire
      }, error => {
        console.error('Failed to update reservation:', error);
      });
  }


//   updateStatusReservation(reservation_id: number, status: any): void {
//     // Vérifier si le statut est défini et s'il s'agit d'une chaîne de caractères
//     if (typeof status === 'string' && status.trim() !== '') {
//       let newStatus: string = status.toUpperCase(); // Convertir le statut en majuscules

//       // Appeler le service pour mettre à jour le statut de la réservation
//       this.service.updateStatusReservation(reservation_id, newStatus).subscribe((res: any) => {
//         this.newStatus = res;
//         console.log("Statut mis à jour ", this.newStatus);
//       });
//     } else {
//       console.error('Statut invalide:', status);
//     }
// }
}