import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  registerForm!: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  constructor(private fb: FormBuilder,private router: Router,public authService: AuthService) {
    this.createForm();
   }

   createForm() {
     this.registerForm = this.fb.group({
       email: ['', Validators.required],
       password: ['',Validators.required]
     });
   }

  ngOnInit(): void {
  }
  submit(val:any){
    //this.router.navigate(['/dashboard']);
    console.log("success",val);
  }

  signup(val:any){
    this.authService.registerUser(val.email,val.password)
    .then(res => {
      this.router.navigate(['/login']);
    }).catch(err =>{
      console.log(err);
    })
  }

}
