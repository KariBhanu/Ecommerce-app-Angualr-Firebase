import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import firebase from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  
  public userLogged:boolean = false;

  constructor(public authService: AuthService,private router: Router,private afAuth:AngularFireAuth) {
     
   }

  ngOnInit(): void {
    this.afAuth.onAuthStateChanged((user)=>{
      if (user) {
        this.userLogged = true;
      } else {
        this.userLogged = false;
      }
    }).then(()=>{console.log(this.userLogged)})
    
  }
  

  logout(){
    this.authService.dologout()
        .then(res => {
          this.router.navigate(['/login']);
        }).catch(err =>{
          console.log(err);
        })
  }
}
