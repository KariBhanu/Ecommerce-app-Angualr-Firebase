import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import firebase from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';
import { userModel } from 'src/app/services/user';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  
  //public user = new userModel;
  public userLogged!:boolean;

  constructor(public authService: AuthService,private router: Router,private afAuth:AngularFireAuth) {
   
   }

  ngOnInit(): void {  
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userLogged = true;
      } else {
        this.userLogged = false;
      }
    });  
  }
  

  logout(){
    this.authService.dologout()
        .then(res => {
          //this.user.email = "";
          this.userLogged = false;
          //this.router.navigate(['/login']);
        }).catch(err =>{
          console.log(err);
        })
  }
}
