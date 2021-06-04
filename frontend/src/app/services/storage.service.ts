import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  public testDoc: any=[];
  constructor(public storage: AngularFirestore, public authService: AuthService) { }

  addCartitem(val: any){
    
    // this.storage.collection('userCart').add({
    //   user: this.authService.userData.email,
    //   cartItem: val
    //   })
    //   .then((docRef) => {
    //   console.log('Document written with ID: ', docRef.id);
    //   })
    //   .catch((error) => {
    //   console.error('Error adding document: ', error);
    // });
}
getCartData(){

  return this.storage.collection('userCart').snapshotChanges();
  
}
}