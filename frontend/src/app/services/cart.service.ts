import { Injectable } from '@angular/core';
import { ProductsModel } from '../model/products.model';
import { StorageService } from './storage.service';


@Injectable({
  providedIn: 'root'
})
export class CartService  {
  public allItems: any  = new ProductsModel();
  public cartData: any  = [];
  public cartItemsList: any  = [];
  public cartTotal: any  = 0;
  public cartItemsCount: any = 0;
  public testcartItemsList: any = [];

  constructor(public storageService: StorageService) {
    // this.cartData = this.allItems.data;
    // this.cartData.forEach((item: any) => {
    //   item.qty = 0;
    //   item.total = 0;
    // });
  }

  getCartItems(): void{
    this.storageService.getCartData().subscribe(data => {
      this.testcartItemsList = data.map(e => {
        return e.payload.doc.data();
      });
      console.log(this.testcartItemsList);
    });
  }
  property_group(objectArray: any, property: any){
    return objectArray.reduce((acc: any, obj: any) => {
       const key = obj[property];
       if (!acc[key]) {
          acc[key] = [];
       }
       acc[key].push(obj);
       return acc;
    }, {});
 }


  addtoCart(val: any): void{

    // this.storageService.addCartitem(val);
    // this.cartData.forEach((item: any) => {
    //   if (item.p_id === val.p_id){
    //     item.qty = item.qty + qty;
    //     item.total = item.product_price * item.qty;
    //   }
    // });
    // this.cartItemsCount = this.cartItemsCount + 1;
    // this.cartItemsList = this.cartData.filter((item: any) => {
    //   return item.qty > 0;
    // });
    // this.cartTotal = this.cartItemsList.reduce((acc: any, item: any) => {
    //   return acc = acc + item.total;
    // }, 0);
    this.getCartItems();
    this.cartData.push(val);
    this.cartList();
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
    this.cartData = [];
    this.cartItemsList = [];
    this.cartTotal = 0;
    this.cartItemsCount = 0;
  }

  cartList(): void{
    this.cartItemsList = [];
    const temp = this.property_group(this.cartData, 'p_id');
    this.cartItemsCount = this.cartData.length;
    let total = 0;
    // tslint:disable-next-line: forin
    for (const key in temp){
      temp[key] = temp[key].map((item: any) => {
          return {...item,
                  qty: temp[key].length,
                  total: item.product_price * temp[key].length
          };
        });
      temp[key] = temp[key].filter((thing: any, index: any, self: any) =>
                  index === self.findIndex((t: any) => (
                  t.p_id === thing.p_id
          )));
      total = total + temp[key][0].total;
      this.cartItemsList.push(temp[key]);
    }
    this.cartTotal = total;
    console.log(this.cartData);
    console.log(this.cartItemsList);
  }


}
