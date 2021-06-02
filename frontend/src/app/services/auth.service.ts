import { Injectable } from '@angular/core';
import firebase  from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth) { }
  
  doGooglelogin(){
    return new Promise<any>((resolve,reject)=>{
      var provider = new firebase.auth.GoogleAuthProvider();
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
    return new Promise<any>((resolve,reject)=>{
      firebase.auth().signOut()
        .then(res => {
          resolve(res);
        }, err => {
          console.log(err);
          reject(err);
        });
    });
  }

  registerUser(email:any,password:any){
    return new Promise<any>((resolve,reject)=>{
      firebase.auth().createUserWithEmailAndPassword(email, password)
              .then((userCredential) => {
              // Signed in 
              var user = userCredential.user;
              resolve(user);
              // ...
            })
            .catch((error) => {
              var errorCode = error.code;
              var errorMessage = error.message;
              reject(errorCode);
            });
    })
  }
  loginUser(email:any,password:any){
    return new Promise<any>((resolve,reject)=>{
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        resolve(user);
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        reject(errorCode);
      });
    })
    

  }
}
