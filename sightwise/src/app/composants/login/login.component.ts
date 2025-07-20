import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SecurityServiceService } from 'src/app/services/security-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup

  constructor(private formBuilder:FormBuilder,
              private securite_svc:SecurityServiceService,
              private router:Router
  ) { }

  ngOnInit(): void {

    this.formLogin = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
    login(){
      this.securite_svc.login(this.formLogin.value).subscribe((res:any)=>{

        console.log("login",res);
        localStorage.setItem("userConnect",JSON.stringify(res))
        localStorage.setItem("token",res.accessToken)
        localStorage.setItem("refreshtoken",res.refreshToken)
        localStorage.setItem("state","0")
        localStorage.getItem("id")

        //this.router.navigateByUrl("/home")})

      this.router.navigateByUrl("/attraction")
      this.refreshPageWithDelay()
})

    }
    refreshPageWithDelay(): void {
      setTimeout(() => {
        window.location.reload();
      }, );
    }
    refreshPageWithAction(): void {
      setTimeout(() => {
        window.location.reload();
      },10000 );
    }
  }




