import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  
  errorMessage: string = '';
  constructor(private fb: FormBuilder,private router: Router,public authService: AuthService) { 
    this.createForm();
  }
  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['',Validators.required]
    });
  }

  ngOnInit(): void {
  }
  
  googleLogin(){
    this.authService.doGooglelogin()
    .then(res => {
      this.router.navigate(['/dashboard']);
    }).catch(err =>{
      console.log(err);
    })
  }

  login(val:any){
    this.authService.loginUser(val.email,val.password)
    .then(res => {
      this.router.navigate(['/dashboard']);
      console.log(res);
    }).catch(err =>{
      console.log(err);
    })
  }
  
}
