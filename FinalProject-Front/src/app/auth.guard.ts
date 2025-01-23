 import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  router = inject(Router);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        if (state.url === '/login' || state.url === '/register') {
          this.router.navigate(['/dashboard']);
          return false;
        }
        return true;
      } else {
        if (state.url === '/dashboard' || state.url === '/profile') {
          this.router.navigate(['/login']);
          return false;
        }
        return true;
      }
    } else {
      return true;
    }
  }
}
