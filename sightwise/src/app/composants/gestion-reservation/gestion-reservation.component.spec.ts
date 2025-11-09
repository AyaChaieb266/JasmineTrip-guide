import { Component, OnInit } from '@angular/core';
import { ReservationServiceService } from 'src/app/services/reservation-service.service';

@Component({
  selector: 'app-gestion-reservation',
  templateUrl: './gestion-reservation.component.html',
  styleUrls: ['./gestion-reservation.component.css']
})
export class GestionReservationComponent implements OnInit {

  listtReservation: any[] = [];
  userConnect: any = {};  // start as an empty object so it's never null

  constructor(private service_res: ReservationServiceService) {}

  ngOnInit(): void {
    // Safely load user info
    const storedUser = localStorage.getItem("userConnect");

    if (storedUser) {
      this.userConnect = JSON.parse(storedUser);
      console.log("✅ User loaded:", this.userConnect);

      // Call only after userConnect is ready
      this.getAllreservation();
    } else {
      console.warn("⚠️ No user found in localStorage. Please log in again.");
    }
  }

  // Gestion des réservations de l'utilisateur connecté
  getAllreservation() {
    this.service_res.getAllReservation().subscribe({
      next: (res: any[]) => {
        // Filter reservations by current user's id safely
        this.listtReservation = res.filter((e: any) => e.tourist?.id === this.userConnect.id);
        console.log("✅ listReservation:", this.listtReservation);
      },
      error: (err) => {
        console.error("❌ Error fetching reservations:", err);
      }
    });
  }
}
