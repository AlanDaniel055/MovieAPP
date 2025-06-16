import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiMovieResponse, Movie, CreditResponse, CastMember, VideoResponse, Video } from '../interfaces/api-interfaces';

const FAVORITES_KEY = 'movieFavorites';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiKey = ''; //Api key de The movie DB
  private baseUrl = ''; // Url de The movie DB
  public imageBaseUrl = ''; // URL para imagenes de peliculas

  constructor(private http: HttpClient) { }

  private get<T>(endpoint: string, params: any = {}): Observable<T> {
    const options = { params: { api_key: this.apiKey, language: 'es-ES', ...params } };
    return this.http.get<T>(`${this.baseUrl}${endpoint}`, options).pipe(
      catchError(error => {
        console.error('Error en la llamada a la API:', error);
        return of([] as any);
      })
    );
  }

  getPopularMovies(page = 1): Observable<Movie[]> {
    return this.get<ApiMovieResponse>('/movie/popular', { page }).pipe(map(res => res.results));
  }

  getTopRatedMovies(page = 1): Observable<Movie[]> {
    return this.get<ApiMovieResponse>('/movie/top_rated', { page }).pipe(map(res => res.results));
  }

  getReleasesForCurrentMonth(): Observable<Movie[]> {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const formatDate = (date: Date) => {
      const d = new Date(date);
      let m = '' + (d.getMonth() + 1);
      let day = '' + d.getDate();
      const y = d.getFullYear();
      if (m.length < 2) m = '0' + m;
      if (day.length < 2) day = '0' + day;
      return [y, m, day].join('-');
    };

    return this.get<ApiMovieResponse>('/discover/movie', {
      'primary_release_date.gte': formatDate(firstDay),
      'primary_release_date.lte': formatDate(lastDay),
      'sort_by': 'popularity.desc'
    }).pipe(map(res => res.results));
  }

  getMovieDetails(id: string): Observable<Movie | null> {
    return this.get<Movie>(`/movie/${id}`).pipe(catchError(() => of(null)));
  }

  getMovieCredits(movieId: string): Observable<CastMember[]> {
    return this.get<CreditResponse>(`/movie/${movieId}/credits`).pipe(
      map(res => res.cast),
      catchError(() => of([] as CastMember[]))
    );
  }

  // >>> NUEVO MÉTODO: Obtener videos de la película <<<
  getMovieVideos(movieId: string): Observable<Video[]> {
    return this.get<VideoResponse>(`/movie/${movieId}/videos`).pipe(
      map(res => res.results), // Solo nos interesa el array 'results'
      catchError(() => of([] as Video[])) // En caso de error, devuelve un array vacío de videos
    );
  }

  getFavoriteMovies(): Movie[] {
    const favorites = localStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
  }

  isFavorite(movieId: number): boolean {
    return this.getFavoriteMovies().some(m => m.id === movieId);
  }

  addToFavorites(movie: Movie) {
    const favorites = this.getFavoriteMovies();
    if (!this.isFavorite(movie.id)) {
      favorites.push(movie);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    }
  }

  removeFromFavorites(movieId: number) {
    const favorites = this.getFavoriteMovies().filter(m => m.id !== movieId);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
}