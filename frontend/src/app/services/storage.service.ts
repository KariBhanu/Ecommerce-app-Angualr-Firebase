import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  public testDoc: any = [];
  constructor(public storage: AngularFirestore, public authService: AuthService) { }

  // tslint:disable-next-line: typedef
  addCartitem(val: any){
    return new Promise((resolve,reject)=>{
      const temp: any = [];
      let Id = '';
      this.storage.collection('userCart', ref => ref.where('user', '==', val.user).where('p_id', '==', val.p_id)).get()
        .toPromise().then((querySnapshot: any) => {
          querySnapshot.forEach((doc: any) => {
            temp.push(doc.data());
            Id = doc.id;
          });
          if (temp.length === 0){
            this.storage.collection('userCart').add(val)
            .then((docRef) => {
              resolve('Successs')
              console.log('Document written with ID: ', docRef.id);
            })
            .catch((error) => {
              reject();
              console.error('Error adding document: ', error);
          });
         }
         else{
            this.storage.collection('userCart').doc(Id).update({
              qty: temp[0].qty + 1
          })
          .then(() => {
            resolve('Successs')
            console.log('Document successfully updated!');
          })
          .catch((error) => {
            reject();
              // The document probably doesn't exist.
            console.error('Error updating document: ', error);
          });
         }
      });
    });
}

getCartData(user: any){
  return this.storage.collection('userCart', ref => ref.where('user', '==', user)).get();
}

deleteDoc(docId:any){
  return this.storage.collection('userCart').doc(docId).delete();
}

removefromCart(val:any){
  return new Promise<any> ((resolve,reject)=>{
    const temp: any = [];
    let Id = '';
    this.storage.collection('userCart', ref => ref.where('user', '==', val.user).where('p_id', '==', val.p_id)).get()
      .toPromise().then((querySnapshot: any) => {
        querySnapshot.forEach((doc: any) => {
          temp.push(doc.data());
          Id = doc.id;
        });
        if (temp[0].qty > 1){
          this.storage.collection('userCart').doc(Id).update({
            qty: temp[0].qty - 1
            })
            .then(() => {
              resolve('Successs')
              console.log('Document successfully updated!');
            })
            .catch((error) => {
              reject();
                // The document probably doesn't exist.
              console.error('Error updating document: ', error);
            });
        }
        else{
          this.storage.collection('userCart').doc(Id).delete();
          resolve('success');
        }
    });
  });
}

}
