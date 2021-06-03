import { Component, Input, OnInit , OnChanges, EventEmitter, Output } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit , OnChanges {

  @Input()  allProductList: any;
  @Input() searchedText!: string;
  @Output() cartCount: EventEmitter<string> = new EventEmitter();

  public count = 0;
  public filteredProducts: any;
  constructor(public cartService: CartService) { }

  ngOnInit(): void {
    // console.log(this.allProductList);
  }
  ngOnChanges(): void{
    this.filteredProducts = this.productFilter();
    console.log(this.filteredProducts);
  }

  addTocart(val:any): void{
    this.count = this.count + 1;
    this.cartCount.emit(this.count.toString());
    val = {...val,
            "qty":0}
    this.cartService.addtoCart(val,1);
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
