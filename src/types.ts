export interface Show {
  id: number;
  title: string;
  type: string;
  description: string;
  poster: string;
}

export interface Episode {
  id: number;
  seriesId: number;
  episodeNumber: number;
  title: string;
  watched: boolean;
}
