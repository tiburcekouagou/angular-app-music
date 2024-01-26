import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService {

  constructor(private aS: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    if (!this.aS.isAuthenticated()) {
      console.log('no login...');
      this.router.navigate(['/login'], {
        queryParams: {messageError: 'Error authentification'}
      })
    } else {
      console.log('login..');
      return true;
    }
    
    return false
  }
}
