import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SecurityServiceService} from 'src/app/services/security-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formRegister: FormGroup
  fileToUpload: Array<File> = [];
  userList:any

  constructor(private formBuilder:FormBuilder,
              private securite_svc:SecurityServiceService,
               private router:Router) { }

  ngOnInit(): void {
    this.getAllUser()

    this.formRegister = this.formBuilder.group({
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      addresse:['',Validators.required],
      //nationality:['',Validators.required],
      image: ['', Validators.required],
      passport_num: ['', Validators.required],

    });

  }

  handleFileInput(files: any) {
      this.fileToUpload = <Array<File>>files.target.files;
      console.log(this.fileToUpload);
    }

    Register() {
      let formdata = new FormData();
      formdata.append('email', this.formRegister.value.email);
      formdata.append('username', this.formRegister.value.username);
      formdata.append('password', this.formRegister.value.password);
      formdata.append('phoneNumber', this.formRegister.value.phoneNumber);
      formdata.append('addresse', this.formRegister.value.addresse);
      formdata.append('passport_num', this.formRegister.value.passport_num);
     // formdata.append('nationality', this.formRegister.value.nationality);

      formdata.append('file', this.fileToUpload[0]);

      this.securite_svc.Register(formdata).subscribe((res: any) => {
        Swal.fire('Please check your confirmation email.');
        console.log('tourist', res);
      });
    }
    getAllUser(){
      this.securite_svc.getAllUser().subscribe((res:any)=>{
        this.userList=res
        console.log("UserList:",this.userList)

      })
    }
    refreshPageWithDelay(): void {
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
}
