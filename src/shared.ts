export const MAIN_PLAYERS: string[] = ['Sam Denby', 'Adam Chase', 'Ben Doyle'] as const;

export interface JetLagSeason {
  seasonNumber: number;
  seasonName: string;
  winners: string[];
}
