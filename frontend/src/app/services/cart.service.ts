import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';


@Injectable({
  providedIn: 'root'
})
export class CartService  {
  public cartData: any  = [];
  public cartTotal: any  = 0;
  public cartItemsCount: any = 0;

  constructor(public storageService: StorageService) {
    // this.cartData = [];
  }

  getCartItems(user: any){
    this.cartData = [];
    console.log(user);
    this.storageService.getCartData(user).toPromise().then((querySnapshot: any) => {
      querySnapshot.forEach((doc: any) => {
        this.cartData.push(doc.data());
      });
      this.cartTotalCounter();
      console.log(this.cartData);
      console.log(this.cartTotal);
      console.log(this.cartItemsCount);
    });
  }

  dummyFunc(){
    console.log("from dummy",this.cartData);
    console.log("from dummy",this.cartTotal);
    console.log("from dummy",this.cartItemsCount);
  }


  logoutEmpty(){
    this.cartData=[];
    this.cartItemsCount = 0;
    this.cartTotal = 0;
  }


  addtoCart(val: any){
   this.storageService.addCartitem(val).then(()=>{
     this.getCartItems(val.user);
   })
  }
  removefromCart(val: any): void{
    this.storageService.removefromCart(val).then(()=>{
      this.getCartItems(val.user);
    })
  }
  emptyCart(user:any): void{
    this.cartData = [];
    this.cartTotal = 0;
    this.cartItemsCount = 0;
    //console.log(user);
    if(user !== ''){
      this.storageService.getCartData(user).toPromise().then((querySnapshot: any) => {
        querySnapshot.forEach((doc: any) => {
          this.storageService.deleteDoc(doc.id);
        });
      });
    }
  }

  cartTotalCounter(): void {
    this.cartItemsCount = 0;
    this.cartTotal = 0;
    this.cartData.forEach((element: any) => {
      this.cartTotal = this.cartTotal + (element.product_price * element.qty);
      this.cartItemsCount = this.cartItemsCount + element.qty;
    });
  }

}

