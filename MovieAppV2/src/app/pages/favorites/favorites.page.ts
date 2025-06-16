import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../interfaces/api-interfaces';

@Component({
  selector: 'app-favorites',
  templateUrl: 'favorites.page.html',
  styleUrls: ['favorites.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule]
})
export class FavoritesPage {
  public favoriteMovies: Movie[] = [];
  public imageBaseUrl = '';

  constructor(public movieService: MovieService) {
    this.imageBaseUrl = this.movieService.imageBaseUrl;
  }

  ionViewWillEnter() {
    this.loadFavorites();
  }

  loadFavorites() {
    this.favoriteMovies = this.movieService.getFavoriteMovies();
  }
}