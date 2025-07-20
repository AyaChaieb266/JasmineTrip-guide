import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AttractionServiceService } from 'src/app/services/attraction-service.service';
import { ApiAdminServiceService } from 'src/app/services/api-admin-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-categorie',
  templateUrl: './add-categorie.component.html',
  styleUrls: ['./add-categorie.component.css']
})
export class AddCategorieComponent implements OnInit {
  formCategory: FormGroup;
  listCategory: any;

  constructor(
    private formBuilder: FormBuilder,
    private service_atr: AttractionServiceService,
    private service: ApiAdminServiceService
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.formCategory = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  getCategories() {
    this.service.allCategory().subscribe((res: any) => {
      this.listCategory = res;
      console.log("La liste des catégories est ", this.listCategory);
    });
  }

  addCategory() {
    const formData = {
      name: this.formCategory.value.name,
      description: this.formCategory.value.description
    };

    this.service_atr.addCategorie(formData).subscribe(
      (res: any) => {
        Swal.fire('Categrie Ajouté');
        console.log('Category', res);
      },
      (error: any) => {
        console.error('Erreur lors de l\'enregistrement de la catégorie', error);
      }
    );
  }
}
