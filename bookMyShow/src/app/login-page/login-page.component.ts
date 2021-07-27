import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

user:User;
users:any;
  constructor(private userService:UserService, private router: Router) { }

  ngOnInit() {
    this.user=new User();
    // this.userService.changeLoggedInUser(null);
  }

  signIn(){
    this.userService.signIn(environment.url).subscribe(data => {
      console.log(data);
      data.forEach(element => {
        if(element.email===this.user.email && element.password===this.user.password){
          console.log("Valid User");
          environment.user=this.user.email+"";
          // this.userService.changeLoggedInUser(this.user);
          this.router.navigateByUrl("/dashboard");
        }
      });
    })
}
}
