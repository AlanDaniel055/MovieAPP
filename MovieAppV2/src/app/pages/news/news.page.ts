import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; 
import { IonContent, IonHeader, IonTitle, IonToolbar, IonSpinner, IonList, IonItem, IonThumbnail, IonLabel, IonIcon } from '@ionic/angular/standalone';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../interfaces/api-interfaces';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonSpinner,
    IonList, IonItem, IonThumbnail, IonLabel,
    IonIcon,
    CommonModule,
    FormsModule,
    RouterModule 
  ]
})
export class NewsPage implements OnInit {

  monthlyReleases: Movie[] = [];
  imageBaseUrl: string = '';
  isLoading: boolean = false;

  constructor(private movieService: MovieService) {
    this.imageBaseUrl = this.movieService.imageBaseUrl;
  }

  ngOnInit() {
    this.loadMonthlyReleases();
  }

  loadMonthlyReleases() {
    this.isLoading = true;
    this.movieService.getReleasesForCurrentMonth().subscribe(
      (movies: Movie[]) => {
        this.monthlyReleases = movies;
        this.isLoading = false;
        console.log('Películas de estreno del mes cargadas:', this.monthlyReleases);
      },
      (error: any) => {
        console.error('Error al cargar los estrenos del mes:', error);
        this.isLoading = false;
      }
    );
  }
}