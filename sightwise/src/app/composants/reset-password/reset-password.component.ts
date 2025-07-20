import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SecurityServiceService } from 'src/app/services/security-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  formReset:FormGroup

  token=this.activeRoute.snapshot.params["token"]
  constructor(private security_svc:SecurityServiceService,
    private formBuilder:FormBuilder,
    private activeRoute:ActivatedRoute,
    private route :Router) { }

  ngOnInit(): void {
    this.formReset = this.formBuilder.group({
      newPassword: ['', Validators.required],
  
    })
  }
  ResetPass(){
    let formdata = new FormData();
    formdata.append('newPassword',this.formReset.value.newPassword);
    this.security_svc.resetPassword(this.token,formdata).subscribe((res: any) => {
      
        Swal.fire('Password changed');
      
     
      console.log('', res);
      this.route.navigateByUrl("/login")
     }
     );

  


    }

}
