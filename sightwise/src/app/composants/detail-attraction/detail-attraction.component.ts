import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AttractionServiceService } from 'src/app/services/attraction-service.service';
import { ServiceCommentaireService } from 'src/app/services/commentaire-service.service';
import { DetailServiceService } from 'src/app/services/detail-service.service';
import { ReservationServiceService } from 'src/app/services/reservation-service.service';
import { SecurityServiceService } from 'src/app/services/security-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail-attraction',
  templateUrl: './detail-attraction.component.html',
  styleUrls: ['./detail-attraction.component.css']
})
export class DetailAttractionComponent implements OnInit {

  form: FormGroup;
  formreservation: FormGroup;
  attractionId : any
  userConnect=JSON.parse(localStorage.getItem("userConnect"))
  attractionByid: any
  listCategory : any
  listAttraction : any
  averageRating: any
  avis:number = 0;
  UserById:any
  serviceIds:any
  selectedServices: Set<any> = new Set<any>();
  dropdownOpen = false;
  

  id = this.activeRoute.snapshot.params['id'];
  constructor(private service:DetailServiceService ,
     private activeRoute : ActivatedRoute,
      private router: Router,
      private formBuilder : FormBuilder,
      private service_res:ReservationServiceService,
      private service_com:ServiceCommentaireService ,
      private service_atr:AttractionServiceService,
    private service_sec:SecurityServiceService) {} 

  ngOnInit(): void {
    
 
    this.getAttrationByID()

    this.getAttraction()
    this.getCategory()
    // this.navigateToReservation()

    this.getAverageRating()
    this.getUserById()


    this.formreservation = this.formBuilder.group({
 
      date_debut: ['', [Validators.required, this.validateDateDebut.bind(this)]],
      date_fin: ['', [Validators.required, this.validateDateFin.bind(this)]],
      services: [[], [Validators.required, this.validateServices.bind(this)]],
      
      
  });
  this.form = this.formBuilder.group({
   
 
    avis: ['', Validators.required],
    content : ['', Validators.required],
 
    
    
});




  }
  //affiche date d'aujoud'hui -controle de saisie-
  getCurrentDate(): string {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = today.getMonth() + 1; // Months are zero-based
    const dd = today.getDate();
    return `${yyyy}-${mm < 10 ? '0' + mm : mm}-${dd < 10 ? '0' + dd : dd}`;
  }
  validateDateDebut(control: FormControl): { [s: string]: boolean } {
    const selectedDate = new Date(control.value);
    const currentDate = new Date();
    if (selectedDate < currentDate) {
      return { 'invalidDate': true };
    }
    return null;
  }
  validateDateFin(control: FormControl): { [s: string]: boolean } {
    const selectedDateDebut = new Date(this.formreservation?.get('date_debut')?.value);
    const selectedDateFin = new Date(control.value);
    if (selectedDateFin <= selectedDateDebut) {
      return { 'invalidEndDate': true };
    }
    return null;
  }








//test date
  validateDate(control: FormControl): { [s: string]: boolean } {
    const selectedDate = new Date(control.value);
    const currentDate = new Date();
    if (selectedDate < currentDate) {
      return { 'invalidDate': true };
    }
    return null;
  }
  //validation de service
  validateServices(control: FormControl): { [key: string]: boolean } | null {
    this.serviceIds = Array.from(this.selectedServices);
    if ( this.serviceIds &&  this.serviceIds.length > 0) {
      return null; // Validation réussie
    }
    return { 'noServiceSelected': true }; // Validation échouée
  }














  

  
  getAttrationByID(){
    this.service.getAttractionDetail(this.id).subscribe((res:any)=>{
      this.attractionByid = res
      
        
        
    
      console.log("Detail", this.attractionByid);
    })
  }
  getCategory(){
    this.service.allCategory().subscribe((res:any)=>{
      this.listCategory=res
      console.log("list of categories is", this.listCategory)
      

    })

  }
  getAttraction(){
    this.service.allAttraction().subscribe((res:any)=>{
      this.listAttraction=res
      console.log("list of attraction is ", this.listAttraction);
 },

)
  }

  getUserById(){
    this.service_sec.getUserById(this.userConnect.id).subscribe((res:any)=>{
      this.UserById=res
      console.log("user By Id",this.UserById);
      
    },)
  }
  refreshPageWithAction(): void {
    setTimeout(() => {
      window.location.reload();
    },500 );
  }
  

 
 
 
 
 
  touristAddCommentByIdAtr() {
   
    this.service_com.touristCommentAtraction(this.id,this.userConnect.id,this.form.value).subscribe((res: any) => {

      console.log('comment', res);
        
      })
      }



     
      getAverageRating(): void {
        this.service_com.getAverageRating(this.id).subscribe(
          (averageRating: number) => {
            this.averageRating = averageRating;
            console.log('average rating :', this.averageRating);
          },
          (error) => {
            console.error(
              'Erreur lors de la récupération de la moyenne des évaluations :',
              error
            );
          }
        );
      }
    
      //add comments
      addAverageRating(): void {
        this.service_com.touristCommentAtraction(this.id,this.userConnect.id,this.form.value).subscribe(
          (averageRating: any) => {
            console.log('average add :', averageRating);
            Swal.fire('Added successfully');
      
            // Ajouter le nouveau commentaire au début de la liste
            this.attractionByid.comments.unshift(this.form.value);
      
            // Réinitialiser le formulaire
            this.form.reset();
      
            // Mettre à jour la liste des commentaires affichés
            this.displayedComments = this.attractionByid.comments.length;
      
            // Mettre à jour la moyenne des évaluations
            this.getAttrationByID();
          },
          (error) => {
            console.error(
              'Erreur lors de la récupération de la moyenne des évaluations :',
              error
            );
          }
        );
      }
      

      displayedComments: number = 2; // Nombre de commentaires à afficher initialement

    // Autres méthodes et propriétés de votre composant

    loadMoreComments() {
        this.displayedComments += 2; // pour ajuster le nombre de commentaires à ajouter
    }

  refreshPageWithDelay(): void {
    setTimeout(() => {
      window.location.reload();
    }, );
  }
    
  
  selectservice(event: Event) {
    const selectedServiceId = Number((event.target as HTMLSelectElement).value);
    // Vérifier si this.serviceIds est undefined et l'initialiser si nécessaire
    if (this.serviceIds === undefined) {
      this.serviceIds = [];
    }
    // Vérifier si le service est déjà dans la liste
    const index = this.serviceIds.indexOf(selectedServiceId);
    if (index > -1) {
      // Retirer le service de la liste
      this.serviceIds.splice(index, 1);
    } else {
      // Ajouter le service à la liste
      this.serviceIds.push(selectedServiceId);
    }
    console.log('Selected services:', this.serviceIds);
  }

// isSelected(serviceId: number): boolean {
//     if (!this.serviceIds) {
//       return false;
//     }
//     return this.serviceIds.includes(serviceId);
//   }

addReservation() {
  if (this.formreservation.invalid) {
    this.formreservation.markAllAsTouched();
    return;
  }
  this.serviceIds = Array.from(this.selectedServices); // Convert Set to array
  this.formreservation.value.services = this.serviceIds;
  this.service_res.createReservation(this.id, this.userConnect.id, this.serviceIds, this.formreservation.value).subscribe(
    (res) => {
      Swal.fire({
        title: "confirmed ",
        text: "save reservation",
        imageUrl: "https://unsplash.it/400/200",
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image"
      })
      console.log('Reservation created successfully', res);
    },
    (err) => {
      console.error('Error creating reservation', err);
    }
  );
}



updateToDoAt(event:any) {
  // Convertir la valeur de la date au format Date
  this.formreservation.value.date_debut = new Date(event.target.value);
}
updateToDoAtt(event:any) {
  // Convertir la valeur de la date au format Date
  this.formreservation.value.date_fin = new Date(event.target.value);
}
 


toggleDropdown() {
this.dropdownOpen = !this.dropdownOpen;
}

//selection et ajout de service
toggleServiceSelection(event: any, serviceId: number) {
if (event.target.checked) {
this.selectedServices.add(serviceId);
this.formreservation.patchValue({services:this.selectedServices})
console.log("liste selectionee",this.selectedServices);
} else {
this.selectedServices.delete(serviceId);
console.log("liste selectionee",this.selectedServices);
}
}

isSelected(serviceId: number): boolean {
return this.selectedServices.has(serviceId);
}
getSelectedServiceNames(): string {
if (!this.attractionByid?.services) return '';
const selectedNames = this.attractionByid.services
.filter((s: any) => this.isSelected(s.id))
.map((s: any) => s.name)
.join(', ');
return selectedNames;
}

}
