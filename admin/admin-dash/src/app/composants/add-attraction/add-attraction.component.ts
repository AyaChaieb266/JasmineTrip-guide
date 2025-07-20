import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiAdminServiceService } from 'src/app/services/api-admin-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-attraction',
  templateUrl: './add-attraction.component.html',
  styleUrls: ['./add-attraction.component.css']
})
export class AddAttractionComponent implements OnInit {
  form: FormGroup;

  //variable "fileToUpoad" de la fonction ==> ajout d'un seul image

 // fileToUpload: Array<File> = [];
 //variable de type list "myfiles" ==> savelist plusieurs images
 myFiles:string[]=[]
 listCategory : any

  constructor(private formBuilder: FormBuilder, private service:ApiAdminServiceService) { }

  ngOnInit(): void {
    this.getCategories()
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      cat_id: ['', Validators.required],
      location: ['', Validators.required],
      available_Lang: ['', Validators.required],
     opening_hour: ['', Validators.required],
    closing_hour: ['', Validators.required],
     description: ['', Validators.required],
    visitor_numbers: ['', Validators.required],
      price: ['', Validators.required],
      photo: ['', Validators.required],
      // provider_id: ['', Validators.required],
    });
  }

  //fonction ==> ajout d'un seul image
  // handleFileInput(files: any) {
  //   this.fileToUpload = <Array<File>>files.target.files;
  //   console.log(this.fileToUpload);
  // }

  getCategories(){
    this.service.allCategory().subscribe((res:any)=>{
      this.listCategory=res
      console.log("liste de category est ", this.listCategory)
      

    })
  }

onFileChange(event:any){
    for(var i=0;i < event.target.files.length;i++){
      this.myFiles.push(event.target.files[i])
    }
  }

  addAttraction() {
    let formdata = new FormData();
    formdata.append('name', this.form.value.name);
    formdata.append('location', this.form.value.location);
    formdata.append('available_Lang', this.form.value.available_Lang);
   formdata.append(' opening_hour', this.form.value. opening_hour);
    formdata.append('closing_hour', this.form.value.closing_hour);
   formdata.append('description', this.form.value.description);
   formdata.append('visitor_numbers', this.form.value.visitor_numbers);
    formdata.append('price', this.form.value.price);
    //formdata.append('file', this.fileToUpload[0]);
    for(var i=0;i <this.myFiles.length;i++){
      formdata.append('files',this.myFiles[i])
    }
    this.service.addAttrWithCategory(this.form.value.cat_id,formdata).subscribe((res: any) => {
     Swal.fire('attraction registred');
      console.log('Attraction', res);
    });
  }

}
