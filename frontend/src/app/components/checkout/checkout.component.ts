import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  @Input() user!: string;
  @Output() cartClose: EventEmitter<string> = new EventEmitter();
  addressForm!: FormGroup;
  constructor(public cartService: CartService, private fb: FormBuilder) {
    this.createForm();
  }
  ngOnInit(): void {
    console.log("get from checkout")
    this.cartService.getCartItems(this.user);
    //this.cartService.dummyFunc();
  }
  createForm() {
    this.addressForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      address: ['', Validators.required],
      phonenumber: ['', Validators.required],
      district: ['', Validators.required],
      pincode: ['', Validators.required],
      state: ['', Validators.required],
    });
  }
  cartClosefun(): void{
    this.cartClose.emit();
  }
  addTocart(val: any){
    this.cartService.addtoCart(val);
  }
}
