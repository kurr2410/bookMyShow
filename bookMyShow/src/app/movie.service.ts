import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  getMovies(url): Observable<any> {
    return this.http.get(url+ '/movie');
  }
  addMovie(url, data): Observable<any> {
    console.log("addmovie in service")
    return this.http.post(url + '/addMovie', data);
  }

  deleteMovie(url,movie): Observable<any>{
    return this.http.delete(url + '/deleteMovie/'+ movie);
  }

  updateSeats(url,data): Observable<any> {
    return this.http.put(url+ '/updateSeats',data)
  }
}
