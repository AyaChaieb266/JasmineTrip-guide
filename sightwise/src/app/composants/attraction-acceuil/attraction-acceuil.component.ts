import { Component, OnInit } from '@angular/core';
import { AttractionServiceService } from '../../services/attraction-service.service';
import { Router } from '@angular/router';
import { Lightbox } from 'ngx-lightbox';

@Component({
  selector: 'app-attraction-acceuil',
  templateUrl: './attraction-acceuil.component.html',
  styleUrls: ['./attraction-acceuil.component.css']
})
export class AttractionAcceuilComponent implements OnInit {
  listAttraction:any
  listCategory:any
  selectedcategory:any
  p: number = 1;
  term : any;

  constructor(private service:AttractionServiceService, private lightbox:Lightbox) { }

  ngOnInit(): void {
    this.getAttraction()
    this.getCAT
    this.getTheCategory()
    this.getCategory()
    
  }

  getAttraction(){
    this.service.allAttraction().subscribe((res:any)=>{
      this.listAttraction=res
      console.log("liste d'attraction ", this.listAttraction);
 },)}

 getCategory(){
  this.service.allCategory().subscribe((res:any)=>{
    this.listCategory=res
    console.log("liste de category est ", this.listCategory)
    

  })
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
getTheCategory() {
  this.service.allCategory().subscribe((res: any) => {
      this.listCategory = res;
      console.log("Liste des catégories :", this.listCategory);
  });
}
getCAT(categoryId: any) {
  if (this.selectedcategory === categoryId) {
      // Si la sous-catégorie actuellement sélectionnée est la même que celle qui a été cliquée, désélectionnez-la
      this.selectedcategory = null;
      // Afficher toutes les attractions
      this.service.allAttraction().subscribe((res: any) => {
          this.listAttraction = res;
          console.log('Toutes les attractions :', this.listAttraction);
      });
  } else {
      // Sélectionnez la catégorie et filtrez les attractions
      this.selectedcategory = categoryId;
      this.service.allAttraction().subscribe((res: any) => {
          this.listAttraction = res.filter((attraction: any) => {
              return attraction && attraction.category && attraction.category.id === categoryId;
          });
          console.log('La liste des attractions filtrée :', this.listAttraction);
      });
  }
}
refreshPageWithDelay(): void {
  setTimeout(() => {
    window.location.reload();
  }, );
}





}
