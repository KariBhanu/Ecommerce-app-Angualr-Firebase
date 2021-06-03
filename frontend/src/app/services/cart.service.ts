import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public allItems: any  = {};
  public cartData: any  = [];
  public cartItemsList: any  = {};
  public cartTotal: any  = 0;
  constructor() { }

  addtoCart(val: any){
    this.cartData.push(val);
  }
}
