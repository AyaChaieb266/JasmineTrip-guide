import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiAdminServiceService } from 'src/app/services/api-admin-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-attraction',
  templateUrl: './update-attraction.component.html',
  styleUrls: ['./update-attraction.component.css']
})
export class UpdateAttractionComponent implements OnInit {
  attractionByid:any
  reservationByIdAttraction:any
  commentByIdAttraction:any
  form: FormGroup;
   fileToUpload: Array<File> = [];
  //savelist plusieurs images
  myFiles:string[]=[]
  listCategory : any
 
 //prendre id de url
  id=this.activeRoute.snapshot.params["id"]
  constructor(private formBuilder:FormBuilder, 
              private service:ApiAdminServiceService,
               private activeRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.getAttractionDetail()
    this.getReservationByIdAttraction()
    this.getCommentByIdAttraction()
    
    this.getCategories()
    

    this.form = this.formBuilder.group({
       name: ['', Validators.required],
       cat_id: ['', Validators.required],
       available_Lang: ['', Validators.required],
       closing_hour: ['', Validators.required],
       opening_hour: ['', Validators.required],
       location: ['', Validators.required],
       price: ['', Validators.required],
       visitor_numbers: ['', Validators.required],
       description: ['', Validators.required],
    });
  }

  getAttractionDetail(){
    this.service.getAttractionDetail(this.id).subscribe((res:any)=>{
      this.attractionByid = res
      this.form.patchValue({
        name:this.attractionByid.name,
        cat_id:this.attractionByid.category.id,
        location:this.attractionByid.location,
        available_Lang:this.attractionByid.available_Lang,
        description:this.attractionByid.description,
        opening_hour:this.attractionByid.opening_hour,
        closing_hour:this.attractionByid.closing_hour,
        price:this.attractionByid.price,
        visitor_numbers:this.attractionByid.visitor_numbers,
      })
      console.log("Detail", this.attractionByid);
    })
  }

  getReservationByIdAttraction(){
    this.service.getReservationById(this.id).subscribe((res:any)=>{
      this.reservationByIdAttraction =res
      console.log("attraction Reservations ", this.reservationByIdAttraction);
      
    })
  }
  getCommentByIdAttraction(){
    this.service.getCommentsById(this.id).subscribe((res:any)=>{
      this.commentByIdAttraction= res
      console.log("attraction comments ", this.commentByIdAttraction);
      
    })
  }
 
 
  


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
    // formdata.append('email', this.form.value.email);
    // formdata.append('password', this.form.value.password);
    // formdata.append('city', this.form.value.city);
    // formdata.append('address', this.form.value.address);
    //formdata.append('file', this.fileToUpload[0]);
    for(var i=0;i <this.myFiles.length;i++){
      formdata.append('files',this.myFiles[i])
    }
    this.service.addAttrWithCategory(this.form.value.cat_id,formdata).subscribe((res: any) => {
      Swal.fire('attraction registred');
      console.log('CUSTOMER', res);
    });
  }

  updateAttraction(){
    
    let formdata = new FormData();
    formdata.append('name', this.form.value.name);
    formdata.append('location', this.form.value.location);
    formdata.append('opening_hour', this.form.value.opening_hour);
    formdata.append('closing_hour', this.form.value.closing_hour);
    formdata.append('available_Lang', this.form.value.available_Lang);
    formdata.append('description', this.form.value.description);
    formdata.append('visitor_number', this.form.value.visitor_number);
    formdata.append('price', this.form.value.price);

    formdata.append('file', this.fileToUpload[0]);
    for(var i=0;i <this.myFiles.length;i++){
      formdata.append('files',this.myFiles[i])
    }
    this.service.putAttraction(this.form.value.cat_id,this.id,formdata).subscribe((res: any) => {
     // Swal.fire('attraction registred');
      console.log('Attraction updated', res);
    });
  }

}
