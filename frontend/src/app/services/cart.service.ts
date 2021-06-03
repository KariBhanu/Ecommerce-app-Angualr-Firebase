import { isNgTemplate } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { ProductsModel } from '../model/products.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public allItems: any  = new ProductsModel();
  public cartData: any  = [];
  public cartItemsList: any  = [];
  public cartTotal: any  = 0;
  constructor() {
    this.cartData = this.allItems.data;
    this.cartData.forEach((item:any)=>{
      item.qty= 0;
    });
  }

  addtoCart(val: any, qty: number){
    this.cartData.forEach((item:any)=>{
      if(item.p_id === val.p_id){
        console.log(item.qty);
        item.qty = item.qty + qty;
        console.log(item);
      }
    });
    console.log(this.cartData)
    this.cartItemsList = this.cartData.filter((item:any)=>{
      return item.qty>0;
    });
    console.log(this.cartItemsList)
  }
}
