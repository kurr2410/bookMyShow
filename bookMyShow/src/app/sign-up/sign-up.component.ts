import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from "../models/user";
import { UserService } from '../user.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
user:User;
users:any;
confirmPassword:String;
  constructor(private userService:UserService,private router: Router) { }

  ngOnInit() {
    this.user=new User();
  }
  signUp(){
    if(this.user.password===this.confirmPassword){
      this.userService.signUp(environment.url,this.user).subscribe(data => {
        console.log(data);
        this.router.navigateByUrl("/loginPage");
      })
    }
  }
  signIn(){
    this.router.navigateByUrl("/loginPage");
  }
}
