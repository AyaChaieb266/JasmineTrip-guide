import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SecuritéServiceService } from 'src/app/services/securité-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
export class AuthentificationComponent implements OnInit {
  formlogin!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private service_sec: SecuritéServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formlogin = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.formlogin.invalid) {
      Swal.fire('Please fill in both username and password', '', 'warning');
      return;
    }

    this.service_sec.login(this.formlogin.value).subscribe({
      next: (res: any) => {
        console.log("login", res);
        localStorage.setItem("userConnect", JSON.stringify(res));
        localStorage.setItem("token", res.accessToken);
        localStorage.setItem("state", "1");

        // ✅ Check if the user has the ADMIN role
        if (res.roles && res.roles.includes("ROLE_ADMIN")) {
          Swal.fire('Welcome Admin 🌸', '', 'success');
          this.router.navigateByUrl("/home");
        } else {
          Swal.fire('Welcome Back!', '', 'success');
          this.router.navigateByUrl("/home");
        }

        this.refreshPageWithDelay();
      },
      error: (err) => {
        console.error("Login error", err);
        Swal.fire('Login Failed', 'Invalid username or password', 'error');
      }
    });
  }

  refreshPageWithDelay(): void {
    setTimeout(() => {
      window.location.reload();
    }, 800);
  }
}
