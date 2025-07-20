import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SecuritéServiceService } from 'src/app/services/securité-service.service';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
export class AuthentificationComponent implements OnInit {
  form: FormGroup
  formlogin: FormGroup;

  constructor(private formBuilder:FormBuilder,
              private service_sec:SecuritéServiceService,
              private router:Router
  ) { }

  ngOnInit(): void {
    this.formlogin = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

  }

  login(){
    this.service_sec.login(this.formlogin.value).subscribe((res:any)=>{

      console.log("login",res);
      localStorage.setItem("userConnect",JSON.stringify(res))
      localStorage.setItem("token",res.accessToken)
      localStorage.setItem("state","1")

      this.router.navigateByUrl("/home")
    })

  }
  refreshPageWithDelay(): void {
    setTimeout(() => {
      window.location.reload();
    },700 );
  }
}
