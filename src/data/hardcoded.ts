import { JetLagSeason, MAIN_PLAYERS } from '../shared.ts';

const GUEST_PLAYERS: string[] = [
	'Brian McManus',
	'Joseph Pisenti',
	'Michelle Khare',
	'Scotty Allen',
	'Toby Hendy',
	'Tom Scott',
	'Amy Muller',
] as const;

type MainPlayer = typeof MAIN_PLAYERS[number];
type GuestPlayer = typeof GUEST_PLAYERS[number];
type Player = MainPlayer | GuestPlayer;

interface HardcodedJetLagSeason {
	seasonName: string;
	players: Player[];
	winners: Player[];
}

// From: https://en.wikipedia.org/wiki/Jet_Lag:_The_Game#Seasons
const unmappedJetLagSeasons: HardcodedJetLagSeason[] = [
	{
		seasonName: 'Connect 4',
		winners: ['Sam Denby', 'Brian McManus'],
		players: [...MAIN_PLAYERS, 'Brian McManus'],
	},
	{
		seasonName: 'Circumnavigation',
		winners: ['Adam Chase', 'Ben Doyle'],
		players: [...MAIN_PLAYERS, 'Joseph Pisenti'],
	},
	{
		seasonName: 'Tag EUR It',
		winners: ['Adam Chase'],
		players: MAIN_PLAYERS,
	},
	{
		seasonName: 'Battle 4 America',
		winners: ['Adam Chase', 'Ben Doyle'],
		players: [...MAIN_PLAYERS, 'Brian McManus'],
	},
	{
		seasonName: 'Race to the End of the World',
		winners: ['Sam Denby', 'Toby Hendy'],
		players: [...MAIN_PLAYERS, 'Toby Hendy'],
	},
	{
		seasonName: 'Capture the Flag',
		winners: ['Adam Chase', 'Ben Doyle'],
		players: [...MAIN_PLAYERS, 'Scotty Allen'],
	},
	{
		seasonName: 'Tag EUR It 2',
		winners: ['Ben Doyle'],
		players: MAIN_PLAYERS,
	},
	{
		seasonName: 'Arctic Escape',
		winners: ['Sam Denby', 'Michelle Khare'],
		players: [...MAIN_PLAYERS, 'Michelle Khare'],
	},
	{
		seasonName: 'Hide + Seek',
		winners: ['Adam Chase'],
		players: MAIN_PLAYERS,
	},
	{
		seasonName: 'Au$tralia',
		winners: ['Sam Denby', 'Toby Hendy'],
		players: [...MAIN_PLAYERS, 'Toby Hendy'],
	},
	{
		seasonName: 'Tag EUR It 3',
		winners: ['Sam Denby'],
		players: MAIN_PLAYERS,
	},
	{
		seasonName: 'Hide + Seek: Japan',
		winners: ['Ben Doyle'],
		players: MAIN_PLAYERS,
	},
	{
		seasonName: 'Schengen Showdown',
		winners: ['Adam Chase', 'Ben Doyle'],
		players: [...MAIN_PLAYERS, 'Tom Scott'],
	},
	{
		seasonName: 'Hide + Seek NYC',
		winners: ['Sam Denby', 'Ben Doyle'],
		players: [...MAIN_PLAYERS, 'Amy Muller'],
	},
	{
		seasonName: 'Snake',
		winners: ['Adam Chase'],
		players: MAIN_PLAYERS,
	},
];

export const hardcodedJetLagSeasons: JetLagSeason[] = unmappedJetLagSeasons.map((season, index) => ({
	seasonNumber: index + 1,
	...season,
}));
