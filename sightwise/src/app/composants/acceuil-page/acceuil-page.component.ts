import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {AttractionServiceService} from "../../services/attraction-service.service";
import { Lightbox } from 'ngx-lightbox';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-acceuil-page',
  templateUrl: './acceuil-page.component.html',
  styleUrls: ['./acceuil-page.component.css']
})
export class AcceuilPageComponent implements OnInit {
  @ViewChild('categoryModal') exampleModal!: ElementRef;
  listAttraction:any
  categoryId:any
  listCategory:any
  AttractionsByCategoryId:any
  term:any;
  selectedcategory:any=null;


  constructor(private router:Router,
              private route:ActivatedRoute,
              private service_atr : AttractionServiceService,
              private lightbox: Lightbox) { }

  ngOnInit(): void {
    this.getAttraction();
    this.getCategory();
   // this.getAttractionsByCategoryId();

  }

  getAttraction(){
    this.service_atr.allAttraction().subscribe((res:any)=>{
      this.listAttraction=res
      console.log("liste d'attraction ", this.listAttraction);
    },)}

  getCategory(){
    this.service_atr.allCategory().subscribe((res:any)=>{
      this.listCategory=res
      console.log("liste de category est ", this.listCategory)


    })
  }
  getAttractionsByCategoryId(){
    this.service_atr.getAttractionByCategory(this.categoryId).subscribe((res:any)=>{
      this.AttractionsByCategoryId=res
      console.log("liste d'attraction de category " ,this.AttractionsByCategoryId )
    })
  }

  getCAT(event: any) {
    const cat = event.target.value;
    console.log("ID est ", cat);

    if (!cat) {
      this.selectedcategory = null;
      this.service_atr.allAttraction().subscribe((res: any) => {
        this.listAttraction = res;
        console.log('Toutes les attractions :', this.listAttraction);
      });
    }else if(cat == "All Categories"){
      this.selectedcategory =  "Tout les Attractions";
      this.service_atr.allAttraction().subscribe((res: any) => {
        this.listAttraction = res
        console.log('La liste des attractions non filtrée :', this.listAttraction);
     
      });
      this.openModal();
    }
    else {
      this.selectedcategory = cat;
      this.service_atr.allAttraction().subscribe((res: any) => {
        this.listAttraction = res.filter((attraction: any) => {
          return attraction && attraction.category && attraction.category.name == cat;
        });
        console.log('La liste des attractions filtrée :', this.listAttraction);
        this.openModal();
      });
    }
  }
  // getCat(){

  // this.router.navigate(['attraction-acceuil'])
  // }

  idcat:any
  openModal() {
    const modalRef = new bootstrap.Modal(this.exampleModal.nativeElement);
    modalRef.show();
  }
refreshPageWithAction(): void {
  setTimeout(() => {
    window.location.reload();
  }, );
}
refreshPageWithDelay() {
  setTimeout(() => {
    window.location.reload();
  }, );
}

viewAllImages(Images: any) {
  const lightboxImages = Images.photos.map((image: any) => ({
      src: `http://localhost:8089/CATEGORY-SERVICE/attractions/files/${image}`,
      caption: 'Destination Images',
      thumb: '',
      width: '303px',
      height: '300px'
  }));
  this.lightbox.open(lightboxImages, 0, {
      width: '303px',
      height: '300px',
  });
}

}
