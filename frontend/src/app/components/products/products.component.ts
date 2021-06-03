import { Component, Input, OnInit , OnChanges } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit , OnChanges {

  @Input()  allProductList: any;
  @Input() searchedText!: string;
  public filteredProducts: any;
  constructor() { }

  ngOnInit(): void {
    //console.log(this.allProductList);
  }
  ngOnChanges(): void{
    this.filteredProducts = this.productFilter();
    console.log(this.filteredProducts);
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
