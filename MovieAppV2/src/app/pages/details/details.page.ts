import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
import { MovieService } from '../../services/movie.service';
import { Movie, CastMember, Video } from '../../interfaces/api-interfaces';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [
    IonicModule,     
    CommonModule,
    DatePipe
  ]
})
export class DetailsPage implements OnInit {
  public movie: Movie | null = null;
  public imageBaseUrl = '';
  public isFavorite = false;
  public cast: CastMember[] = [];
  public trailerKey: string | null = null;

  constructor(
    private route: ActivatedRoute,
    public movieService: MovieService,
    private toastCtrl: ToastController
  ) {
    this.imageBaseUrl = this.movieService.imageBaseUrl;
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.movieService.getMovieDetails(id).subscribe(movie => {
        this.movie = movie;
        if (movie) {
          this.isFavorite = this.movieService.isFavorite(movie.id);
        }
      });

      this.movieService.getMovieCredits(id!).subscribe(
        (cast: CastMember[]) => {
          this.cast = cast.slice(0, 10);
          console.log('Actores cargados:', this.cast);
        },
        (error: any) => {
          console.error('Error al cargar los actores:', error);
        }
      );

      this.movieService.getMovieVideos(id!).subscribe(
        (videos: Video[]) => {
          const trailer = videos.find(
            video => video.site === 'YouTube' && video.type === 'Trailer' && video.official
          );
          if (trailer) {
            this.trailerKey = trailer.key;
          } else {
            const fallbackTrailer = videos.find(
              video => video.site === 'YouTube' && (video.type === 'Trailer' || video.type === 'Teaser') && video.official
            );
            if (fallbackTrailer) {
                this.trailerKey = fallbackTrailer.key;
            } else {
                const anyYoutubeVideo = videos.find(video => video.site === 'YouTube');
                if (anyYoutubeVideo) {
                    this.trailerKey = anyYoutubeVideo.key;
                }
            }
          }
          console.log('Clave del tráiler:', this.trailerKey);
        },
        (error: any) => {
          console.error('Error al cargar videos de la película:', error);
        }
      );
    }
  }

  toggleFavorite() {
    if (!this.movie) return;

    if (this.isFavorite) {
      this.movieService.removeFromFavorites(this.movie.id);
      this.presentToast('Eliminada de favoritos');
    } else {
      this.movieService.addToFavorites(this.movie);
      this.presentToast('Añadida a favoritos');
    }
    this.isFavorite = !this.isFavorite;
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: 'secondary'
    });
    toast.present();
  }

  openTrailer() {
    if (this.trailerKey) {
      window.open(`https://www.youtube.com/watch?v=${this.trailerKey}`, '_system');
    }
  }

  getRatingColor(rating: number): string {
    if (rating >= 7) return '#21d07a';
    if (rating >= 4) return '#d2d531';
    return '#db2360';
  }

  getRatingGradient(rating: number): string {
    const color = this.getRatingColor(rating);
    const percentage = rating * 10;
    return `conic-gradient(${color} ${percentage}%, transparent ${percentage}%)`;
  }
}