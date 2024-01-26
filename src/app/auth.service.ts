import { Injectable } from '@angular/core';
import { User, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from './firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState = false;

  constructor() { }


  signUp(email: string, password: string) {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user
      if (user) {
        this.authState = true;
      } else {
        this.authState = false;
      }
    })
  } 

  async auth(email: string, password: string): Promise<User> {
    let result = await signInWithEmailAndPassword(auth, email, password);
    let user = result.user
    return user;
  } 
  
  logout() {

  }

  isAuthenticated(): boolean {
    return this.authState;
  }
}
