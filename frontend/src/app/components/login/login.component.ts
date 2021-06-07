import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  errorMessage = '';
  constructor(private fb: FormBuilder, private router: Router, public authService: AuthService,public cartService: CartService) {
    this.createForm();
  }
  // tslint:disable-next-line: typedef
  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }
// tslint:disable-next-line: typedef
  googleLogin(){
    this.authService.doGooglelogin()
    .then(res => {
      this.router.navigate(['/dashboard']);
      this.cartService.getCartItems(res.email);
    }).catch(err => {
      console.log(err);
    });
  }
// tslint:disable-next-line: typedef
  login(val: any){
    this.authService.loginUser(val.email, val.password)
    .then(res => {
      this.router.navigate(['/dashboard']);
      //console.log(res.email);
      this.cartService.getCartItems(res.email);
      console.log(res);
    }).catch(err => {
      console.log(err);
    });
  }

}
