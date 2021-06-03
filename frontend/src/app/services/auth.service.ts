import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any; // Save logged in user data

  constructor(public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
    if (user) {
      this.userData = user;
      localStorage.setItem('user', JSON.stringify(this.userData));
      JSON.parse(localStorage.getItem('user') || '{}');
    } else {
      localStorage.setItem('user', '');
      JSON.parse(localStorage.getItem('user') || '{}');
    }
  });
}

  doGooglelogin(){
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth()
              .signInWithPopup(provider)
              .then(res => {
                resolve(res);
              }, err => {
                console.log(err);
                reject(err);
              });
    });
  }
  dologout(){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signOut()
        .then(res => {
          localStorage.removeItem('user');
          resolve(res);
        }, err => {
          console.log(err);
          reject(err);
        });
    });
  }

  registerUser(email: any, password: any){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(email, password)
              .then((userCredential) => {
              // Signed in
              const user = userCredential.user;
              resolve(user);
              // ...
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              reject(errorCode);
            });
    });
  }
  loginUser(email: any, password: any){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        resolve(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        reject(errorCode);
      });
    });


  }
}
