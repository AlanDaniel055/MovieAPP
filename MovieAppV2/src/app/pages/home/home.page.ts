import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../interfaces/api-interfaces';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    RouterModule 
  ],
})
export class HomePage implements OnInit {
  popularMovies: Movie[] = [];
  topRatedMovies: Movie[] = [];
  featuredMovie?: Movie;
  imageBaseUrl = '';

  constructor(private movieService: MovieService) {
    this.imageBaseUrl = this.movieService.imageBaseUrl;
  }

  ngOnInit() {
    this.movieService.getPopularMovies().subscribe(movies => {
      this.popularMovies = movies;
      this.featuredMovie = movies[0];
    });
    this.movieService.getTopRatedMovies().subscribe(movies => {
      this.topRatedMovies = movies;
    });
  }
}