export const MAIN_PLAYERS: string[] = ['Sam Denby', 'Adam Chase', 'Ben Doyle'] as const;
export const GUEST_PLAYERS: string[] = [
  'Brian McManus',
  'Toby Hendy',
  'Michelle Khare',
] as const;

export type MainPlayer = typeof MAIN_PLAYERS[number];
export type GuestPlayer = typeof GUEST_PLAYERS[number];
export type Player = MainPlayer | GuestPlayer;

export interface JetLagSeason {
  seasonName: string;
  winners: Player[];
}

// From: https://en.wikipedia.org/wiki/Jet_Lag:_The_Game#Seasons
export const hardcodedJetLagSeasons: JetLagSeason[] = [
  {
    seasonName: 'Connect 4',
    winners: ['Sam Denby', 'Brian McManus'],
  },
  {
    seasonName: 'Circumnavigation',
    winners: ['Adam Chase', 'Ben Doyle'],
  },
  {
    seasonName: 'Tag EUR It',
    winners: ['Adam Chase'],
  },
  {
    seasonName: 'Battle 4 America',
    winners: ['Adam Chase', 'Ben Doyle'],
  },
  {
    seasonName: 'Race to the End of the World',
    winners: ['Sam Denby', 'Toby Hendy'],
  },
  {
    seasonName: 'Capture the Flag',
    winners: ['Adam Chase', 'Ben Doyle'],
  },
  {
    seasonName: 'Tag EUR It 2',
    winners: ['Ben Doyle'],
  },
  {
    seasonName: 'Arctic Escape',
    winners: ['Sam Denby', 'Michelle Khare'],
  },
  {
    seasonName: 'Hide + Seek',
    winners: ['Adam Chase'],
  },
  {
    seasonName: 'Au$tralia',
    winners: ['Sam Denby', 'Toby Hendy'],
  },
  {
    seasonName: 'Tag EUR It 3',
    winners: ['Sam Denby'],
  },
];
