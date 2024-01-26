import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  messageError?: string = undefined;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onSubmit(formLogin: NgForm) {
    this.authService.auth(formLogin.value['email'], formLogin.value['password'])
      .then(
        (res) => {
          if (!res) {
            throw new Error("Error ! Credentials are not correct")
          } else {
            this.router.navigate(['dashboard'], { queryParams: { message: 'Success' } })
          }

        }
      ).catch(error => {
        this.messageError = 'error Login or password'
      });
  }
}
