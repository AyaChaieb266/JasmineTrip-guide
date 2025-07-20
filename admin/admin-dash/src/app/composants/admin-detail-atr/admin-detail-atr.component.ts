import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiAdminServiceService } from 'src/app/services/api-admin-service.service';
import { AttractionServiceService } from 'src/app/services/attraction-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-detail-atr',
  templateUrl: './admin-detail-atr.component.html',
  styleUrls: ['./admin-detail-atr.component.css']
})
export class AdminDetailAtrComponent implements OnInit {
  listAttraction:any
  listCategory:any
  selectedcategory:any=null;
  p:number=1;
  term:any;
  serviceById:any
  

 
  constructor(private service:ApiAdminServiceService,
    private service_atr:AttractionServiceService,
            private route:Router,
  ) { }

  ngOnInit(): void {
    this.getAllattraction()
    this.getCategories()
    
    

  }
  

  getAllattraction(){
    this.service.allAttraction().subscribe((res:any)=>{
      this.listAttraction=res
      console.log("liste d'attraction", this.listAttraction);
      
    })
  }

  getCategories(){
    this.service.allCategory().subscribe((res:any)=>{
      this.listCategory=res
      console.log("liste de category est ", this.listCategory)
      

    })
  }

  delete(id:any){

    //alert confirmation delete
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {

        this.service.deleteAttraction(id).subscribe((res:any)=>{

          console.log("attraction deleted",res);
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
          //refresh list
          this.getAllattraction()
          
        })
       
      }
    });
    
  }

  
  

  getCAT(categoryId: any) {
    console.log("id est ", categoryId.target.value);
    const cat= categoryId.target.value
    if (!cat) {
        // Si la sous-catégorie actuellement sélectionnée est la même que celle qui a été cliquée, désélectionnez-la
        this.selectedcategory = null;
        // Afficher toutes les attractions
        this.service.allAttraction().subscribe((res: any) => {
            this.listAttraction = res;
            console.log('Toutes les attractions :', this.listAttraction);
        });
    } else {
        // Sélectionnez la catégorie et filtrez les attractions
        this.selectedcategory = cat;
        this.service.allAttraction().subscribe((res: any) => {
            this.listAttraction = res.filter((attraction: any) => {
                return attraction && attraction.category && attraction.category.id == cat;
            });
            console.log('La liste des attractions filtrée :', this.listAttraction);
        });
    }
  }



}




  


