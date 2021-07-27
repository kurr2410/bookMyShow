import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private loggedInUserService = new BehaviorSubject(new User);
    loggedInUser = this.loggedInUserService.asObservable();

    // changeLoggedInUser(newUser: User) {
    //     this.loggedInUserService.next(newUser);
    // }
    
  signIn(url): Observable<any> {
    return this.http.get(url);
  }
  signUp(url, data): Observable<any> {
    return this.http.post(url + '/addUser', data);
  }
}
