import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

  @Input() invoiceDate: any = '';
  @Input() invoiceNo:any = '';
  @Output() cartClose: EventEmitter<string> = new EventEmitter();
  @Input() cartList:any = [];
  @Input() cartTotal:any = [];
  @Input() address:any = {}
  @Input() user:any = '';
  constructor(public cartService: CartService) { }

  ngOnInit(): void {
  }

  cartClosefun(): void{
    this.cartClose.emit();
  }
  print(){
      window.focus();
      window.print();
  }
}
