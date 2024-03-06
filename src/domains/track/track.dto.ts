export interface CreateTrackDto {
  name: string;
  duration: number; // integer number
}

export interface UpdateTrackDto {
  name?: string;
  duration?: number; // integer number
}
