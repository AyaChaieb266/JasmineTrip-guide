import { Component, OnInit } from '@angular/core';
import { ApiAdminServiceService } from 'src/app/services/api-admin-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  listCategory:any
  categoryById:any
  p:number=1;
  term:any;

  constructor( private service: ApiAdminServiceService) { }

  ngOnInit(): void {
    this.getCategories()
  }

  getCategories() {
    this.service.allCategory().subscribe((res: any) => {
      this.listCategory = res;
      console.log("La liste des catégories est ", this.listCategory);
    });
  }

  delete(id:any){

    //alert confirmation delete
    Swal.fire({
      title: "tu es sûr ???",
      text: "c'est irréversible!!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "oui, supprimer!",
      cancelButtonText:"non"
    }).then((result) => {
      if (result.isConfirmed) {

        this.service.deleteCategory(id).subscribe((res:any)=>{

          console.log("la categorie et ses attractions sont supprimé",res);
          Swal.fire({
            title: "supprimé!",
            text: "La categorie a été supprimer.",
            icon: "success"
          });
          //refresh list
          this.getCategories()
          
        })
       
      }
    });
    
  }

  
  }


