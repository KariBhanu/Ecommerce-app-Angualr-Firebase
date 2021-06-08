import { Component, Input, OnInit , OnChanges, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit , OnChanges {

  @Input()  allProductList: any;
  @Input() searchedText!: string;
  @Input() user!: string;
  public count = 0;
  public filteredProducts: any;
  constructor(public cartService: CartService,private router: Router) { }

  ngOnInit(): void {
    //this.cartService.getCartItems(this.user);
  }
  ngOnChanges(): void{
    this.filteredProducts = this.productFilter();
    console.log(this.filteredProducts);
  }

  addTocart(val: any): void{
    if( this.user!==''){
      console.log('user is present');
      val = {...val,
              'qty':1,
            'user': this.user};
      this.cartService.addtoCart(val);
    }
    else{
      this.router.navigate(['/login']);
    }
  }

  productFilter(): any{
    if (this.searchedText === ''){
      return this.allProductList;
    }

    return this.allProductList.filter( (item: any) => {
      return item.product_name.toLowerCase().includes(this.searchedText.toLowerCase());
    });
  }
}
