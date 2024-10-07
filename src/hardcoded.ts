import { JetLagSeason, MAIN_PLAYERS } from './shared.ts';

const GUEST_PLAYERS: string[] = [
  'Brian McManus',
  'Michelle Khare',
  'Toby Hendy',
] as const;

type MainPlayer = typeof MAIN_PLAYERS[number];
type GuestPlayer = typeof GUEST_PLAYERS[number];
type Player = MainPlayer | GuestPlayer;

interface HardcodedJetLagSeason {
  seasonName: string;
  winners: Player[];
}

// From: https://en.wikipedia.org/wiki/Jet_Lag:_The_Game#Seasons
const unmappedJetLagSeasons: HardcodedJetLagSeason[] = [
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

export const hardcodedJetLagSeasons: JetLagSeason[] = unmappedJetLagSeasons.map((season, index) => ({
  seasonNumber: index + 1,
  ...season,
}));
