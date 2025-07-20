import { Component, OnInit } from '@angular/core';
import { ApiAdminServiceService } from 'src/app/services/api-admin-service.service';
import { AttractionServiceService } from 'src/app/services/attraction-service.service';
import { CommentaireServiceService } from 'src/app/services/commentaire-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-commentaire',
  templateUrl: './commentaire.component.html',
  styleUrls: ['./commentaire.component.css']
})
export class CommentaireComponent implements OnInit {
  listComments:any
  p:number=1;
  averageRating : any
  listAttraction:any
  id:any
  attractionByid :any
  name=localStorage.getItem.name
  

  constructor(private service : ApiAdminServiceService,
              private service_atr:AttractionServiceService,
              private service_com:CommentaireServiceService

  ) { }

  ngOnInit(): void {
    this.getAllComment();
    this.getAverageRating(this.id);
    this.getAttraction();
    this.getAttrationByID();
  }



  getAttraction() {
    this.service.allAttraction().subscribe((res:any)=>{
      this.listAttraction=res;
      console.log("Liste d'attractions : ", this.listAttraction);
      
      // Vérifiez si la liste d'attractions contient des éléments
      if(this.listAttraction.length > 0) {
        // Parcourez chaque attraction dans la liste
        this.listAttraction.forEach(attraction => {
          // Récupérez l'ID de l'attraction actuelle
          const attractionId = attraction.id;
          // Appelez la méthode pour obtenir la moyenne des évaluations pour cette attraction
          this.getAverageRating(attractionId);
        });
      } else {
        console.log("Aucune attraction trouvée dans la liste.");
      }
    });
  }
  
  getAverageRating(attractionId: number): void {
    this.service_atr.getAverageRating(attractionId).subscribe(
      (averageRating: number) => {
        // Utilisez l'averageRating pour l'attraction avec attractionId
        console.log(`Moyenne des évaluations pour l'attraction ${attractionId} : ${averageRating}`);
        // Vous pouvez faire d'autres traitements ici avec l'averageRating
      },
      (error) => {
        console.error('Erreur lors de la récupération de la moyenne des évaluations :', error);
      }
    );
  }


  delete(id:any){

    //alert confirmation delete
    Swal.fire({
      title: "tu es sûr??",
      text: "Cet action est irreversible",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "oui je veux supprimer!",
      cancelButtonText:"non"
    }).then((result) => {
      if (result.isConfirmed) {

        this.service_com.deleteCommentById(id).subscribe((res:any)=>{

          console.log("attraction supprimé",res);
          Swal.fire({
            title: "supprimé!",
            text: "L'attraction a été supprimé avec succé.",
            icon: "success"
          });
          //refresh list
          this.getAllComment()
          
        })
       
      }
    });
    
  }
  
  // getAttraction(){
  //   this.service.allAttraction().subscribe((res:any)=>{
  //     this.listAttraction=res;
  //     console.log("Liste d'attractions : ", this.listAttraction);
  //     // Supposons que vous voulez utiliser l'ID de la première attraction dans la liste
  //     if(this.listAttraction.length > 0) {
  //       this.id = this.listAttraction[0].id; // Assurez-vous que l'objet attraction a une propriété id
  //       this.getAverageRating(); // Appelez maintenant la méthode pour obtenir la moyenne des évaluations
  //     } else {
  //       console.log("Aucune attraction trouvée dans la liste.");
  //     }
  //   });}

  getAttrationByID(){
    this.service_atr.getAttractionDetail(this.id).subscribe((res:any)=>{
      this.attractionByid = res
      console.log("Detail", this.attractionByid);
    })
  }


  getAllComment(){
    this.service.getAllComments().subscribe((res:any)=>{
      this.listComments=res
      console.log("comments List " ,this.listComments);
      
    })
  }

  // getAverageRating(): void {
  //   this.service_atr.getAverageRating(this.id).subscribe(
  //     (averageRating: number) => {
  //       this.averageRating = averageRating;
  //       console.log('average rating :', this.averageRating);
  //     },
  //     (error) => {
  //       console.error(
  //         'Erreur lors de la récupération de la moyenne des évaluations :',
  //         error
  //       );
  //     }
  //   );
  // }

}
