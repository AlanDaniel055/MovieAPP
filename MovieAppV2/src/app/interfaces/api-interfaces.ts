export interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  budget?: number;
  genres?: { id: number; name: string }[];
  homepage?: string;
  imdb_id?: string;
  revenue?: number;
  runtime?: number;
  status?: string;
  tagline?: string;
}

export interface ApiMovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface CreditResponse {
  id: number;
  cast: CastMember[];
  crew: CrewMember[];
}

export interface CastMember {
  adult: boolean;
  gender: number | null;
  id: number;
  known_for_department: string;
  name: string; 
  original_name: string;
  popularity: number;
  profile_path: string | null; 
  cast_id: number;
  character: string; 
  credit_id: string;
  order: number;
}

export interface CrewMember {
  adult: boolean;
  gender: number | null;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  credit_id: string;
  department: string; 
  job: string; 
}
export interface VideoResponse {
  id: number;
  results: Video[];
}
export interface Video {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string; 
  site: string; 
  size: number;
  type: string; 
  official: boolean;
  published_at: string;
  id: string; 
}