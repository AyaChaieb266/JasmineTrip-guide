import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SecurityServiceService } from 'src/app/services/security-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  formForget:FormGroup

  constructor(private security_svc:SecurityServiceService,
              private formBuilder:FormBuilder,
  ) { }

  ngOnInit(): void {
    this.formForget = this.formBuilder.group({
      email: ['', Validators.required],
 
    });
  }
  forgetPass(){
    let formdata = new FormData();
    formdata.append('email', this.formForget.value.email);
    this.security_svc.forgetPassword(formdata).subscribe((res: any) => {
      
        Swal.fire('check your email');
         console.log('', res);
     });

  }

}
