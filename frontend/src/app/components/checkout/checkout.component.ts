import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  @Output() cartClose: EventEmitter<string> = new EventEmitter();
  constructor(public cartService: CartService) { }
  ngOnInit(): void {
  }
  cartClosefun(): void{
    this.cartClose.emit();
  }
}
