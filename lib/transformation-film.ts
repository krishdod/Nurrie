/** Only populate after reviewing actual NURRIE application footage. See docs/transformation-film-brief.md. */
export type TransformationFilmAsset = {
  mp4: string;
  webm?: string;
  poster: string;
  captions: string;
  transcript: string;
  durationLabel: string;
};

// No stock, generated or simulated footage presented as a real product demonstration.
export const TRANSFORMATION_FILM: TransformationFilmAsset | null = null;
