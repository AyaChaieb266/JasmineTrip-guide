import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiAdminServiceService } from 'src/app/services/api-admin-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-categorie',
  templateUrl: './update-categorie.component.html',
  styleUrls: ['./update-categorie.component.css']
})
export class UpdateCategorieComponent implements OnInit {
  formCategory: FormGroup;
  categoryById: any;
  id: any;

  constructor(
    private service: ApiAdminServiceService,
    private formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute
  ) {
    this.id = this.activeRoute.snapshot.params["id"];
  }

  ngOnInit(): void {
    this.formCategory = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
    this.getCategoryDetail();
  }

  getCategoryDetail() {
    this.service.getCategoryDetail(this.id).subscribe((res: any) => {
      this.categoryById = res;
      this.formCategory.patchValue({
        name: this.categoryById.name,
        description: this.categoryById.description,
      });
      console.log("Détail", this.categoryById);
    });
  }

  updateCategory() {
    const updatedCategory = {
      name: this.formCategory.value.name,
      description: this.formCategory.value.description
    };

    this.service.putCategory(this.id, updatedCategory).subscribe((res: any) => {
      Swal.fire('Category updated');
      console.log('category updated', res);
    });
  }
}
