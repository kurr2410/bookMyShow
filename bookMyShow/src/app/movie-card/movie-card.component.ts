import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MovieService } from '../movie.service';

declare var $: any;
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  user = ""
  selectedMovie: string;
  selectedTheater: string;
  selectedShow: string;
  selectedSeats: Array<any>;
  showModal: boolean = false;
  shows: Array<any>;
  seats: Array<any>;
  ticket = {
    movieName: "",
    theater: "",
    show: "",
    seats: []
  }
  @Input() movies: any = [];
  @Output() show: EventEmitter<any> = new EventEmitter();
  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.user = environment.user;
  }

  selectTheater(movie, theater) {
    this.showModal = true;
    this.selectedMovie = movie;
    this.selectedTheater = theater;
    this.movies.forEach(movie => {
      if (movie.name === this.selectedMovie) {
        movie.theaters.forEach(theater => {
          if (theater.name === this.selectedTheater) {
            this.shows = theater.shows;
          }
        });
      }
    });
    document.getElementById("showtime").click();
  }

  showSeats(start, end) {
    this.selectedShow = start;
    this.shows.forEach(show => {
      if (show.start_time === start && show.end_time === end) {
        this.seats = show.seats;
      }
    });
  }

  bookTicket() {
    this.seats = [];
    var demo = $("input[type='checkbox']:checked").map(function () { return $(this).val(); }).get();
    this.ticket.movieName = this.selectedMovie;
    this.ticket.theater = this.selectedTheater;
    this.ticket.show = this.selectedShow;
    this.ticket.seats = demo;

    this.movieService.updateSeats(environment.url, this.ticket).subscribe(data => {
      this.movies = data;
    })
    document.getElementById("confirmation").click();
  }

  printTicket(id) {
    // var printContents = document.getElementById(id).innerHTML;
    //  var originalContents = document.body.innerHTML;
    //  document.body.innerHTML = printContents;
    //  window.print();
    //  document.body.innerHTML = originalContents;
    window.alert("Printed Successfully")
  }


}
