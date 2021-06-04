import { Injectable } from '@angular/core';
import { ProductsModel } from '../model/products.model';
import { StorageService } from './storage.service';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  public allItems: any  = new ProductsModel();
  public cartData: any  = [];
  public cartItemsList: any  = [];
  public cartTotal: any  = 0;
  public cartItemsCount: any = 0;
  public testcartItemsList: any = {};

  constructor(public storageService: StorageService) {
    this.cartData = this.allItems.data;
    this.cartData.forEach((item: any) => {
      item.qty = 0;
      item.total = 0;
    });
  }

  getCartItems(): void{
    this.storageService.getCartData().subscribe(data => {
      this.testcartItemsList = data.map(e => {
        return e.payload.doc.data();
      });
      console.log(this.testcartItemsList);
    });
  }



  addtoCart(val: any, qty: number): void{
    this.getCartItems();
    this.storageService.addCartitem(val);
    this.cartData.forEach((item: any) => {
      if (item.p_id === val.p_id){
        item.qty = item.qty + qty;
        item.total = item.product_price * item.qty;
      }
    });
    this.cartItemsCount = this.cartItemsCount + 1;
    this.cartItemsList = this.cartData.filter((item: any) => {
      return item.qty > 0;
    });
    this.cartTotal = this.cartItemsList.reduce((acc: any, item: any) => {
      return acc = acc + item.total;
    }, 0);
  }
  removefromCart(val: any): void{
    this.cartData.forEach((item: any) => {
      if (item.p_id === val.p_id){
        item.qty = item.qty - 1;
        item.total = item.product_price * item.qty;
      }
    });
    this.cartItemsList = this.cartData.filter((item: any) => {
      return item.qty > 0;
    });
    this.cartTotal = this.cartItemsList.reduce((acc: any, item: any) => {
      return acc = acc + item.total;
    }, 0);
    this.cartItemsCount = this.cartItemsCount - 1;
  }
  emptyCart(): void{
    this.cartData.forEach((item: any) => {
        item.qty = 0;
        item.total = 0;
    });
    this.cartItemsList = [];
    this.cartTotal = 0;
    this.cartItemsCount = 0;
  }
}
