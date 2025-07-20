import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, filter, switchMap, take, throwError } from 'rxjs';
import { SecurityServiceService } from '../services/security-service.service';
import { Router } from '@angular/router';
@Injectable()
export class Httpinterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  constructor(private authService: SecurityServiceService, private router: Router) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.authService.getJwtToken()) {
      request = this.addToken(request, this.authService.getJwtToken());
    }
    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error(request, next);
        } else {
          return throwError(error);
        }
      })
    )as Observable<HttpEvent<any>>;
  }
  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: 'Bearer ' + `${token}`,
      },
    });
  }
  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      return this.authService.refreshToken().pipe(
        switchMap(
          (res: any) => {
            this.isRefreshing = false;
            this.refreshTokenSubject.next(res['token']);
            return next.handle(this.addToken(request, res['token']));
          },
          (error) => {
            // Gérer l'erreur de rafraîchissement ici
            console.error("Erreur lors du rafraîchissement du jeton :", error);
            this.isRefreshing = false;
            // Déconnectez l'utilisateur et redirigez-le vers la page de connexion
            this.authService.logoutt();
            this.router.navigate(['/login']);
            return throwError(error);
          }
        )
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter((token) => token != null),
        take(1),
        switchMap((jwt) => {
          return next.handle(this.addToken(request, jwt));
        })
      );
    }
  }
}