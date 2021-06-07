import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import firebase from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';
import { userModel } from 'src/app/services/user';
import { ProductsModel } from 'src/app/model/products.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit , OnChanges {


  // public user = new userModel;
  public userLogged!: boolean;
  public user: any;
  public products = new ProductsModel();
  public searchText = '';
  public cartCount = '';
  public cartOpened = false;
  constructor(public authService: AuthService, private router: Router, private afAuth: AngularFireAuth, public cartService: CartService) {
   }

  ngOnInit(): void {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user.email;
        //console.log(user.email);
        this.cartService.getCartItems(this.user);
        this.userLogged = true;
      } else {
        this.userLogged = false;
      }
    });
    //this.cartService.getCartItems(this.user);
  }
  ngOnChanges(){
    console.log("this is run");
    //this.cartService.getCartItems(this.user);
  }

  ref(val:any){
    this.cartCount = val;
  }

  cartOpen():void{
    this.cartOpened = true;
  }
  cartClose():void{
    this.cartOpened = false;
  }
  // tslint:disable-next-line: typedef
  logout(){
    this.authService.dologout()
        .then(res => {
          // this.user.email = "";
          this.userLogged = false;
          this.cartService.emptyCart();
          // this.router.navigate(['/login']);
        }).catch(err => {
          console.log(err);
        });
  }
}
