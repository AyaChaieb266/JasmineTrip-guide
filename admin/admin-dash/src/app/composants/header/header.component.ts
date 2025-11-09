import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SecuritéServiceService } from 'src/app/services/securité-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: any;
  userConnect: any;

  constructor(
    private service_sec: SecuritéServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userConnect = JSON.parse(localStorage.getItem('userConnect') || '{}');

    if (this.userConnect?.id) {
      this.getUserById();
    } else {
      console.warn('⚠️ No user found in localStorage');
    }
  }

  getUserById(): void {
    this.service_sec.getUserByIdFromToken(this.userConnect.id).subscribe({
      next: (res: any) => {
        this.user = res;
        console.log('✅ Admin details:', this.user);
      },
      error: (err) => {
        console.error('❌ Error fetching user details:', err);
      }
    });
  }

  logout(): void {
    this.service_sec.logout().subscribe({
      next: (res) => {
        console.log('Logout response:', res);
        if (res.message === 'Log out successful!') {
          localStorage.clear();
          this.router.navigateByUrl('/login');
        }
      },
      error: (err) => {
        console.error('❌ Logout error:', err);
        // even if backend fails, still clear and redirect
        localStorage.clear();
        this.router.navigateByUrl('/login');
      }
    });
  }
}
