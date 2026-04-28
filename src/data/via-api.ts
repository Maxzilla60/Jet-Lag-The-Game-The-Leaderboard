import { values } from 'lodash';
import { JetLagSeason, MAIN_PLAYERS } from '../shared.ts';

interface TableRow {
	Season: string;
	Title: string;
	'Guest(s)': string;
	'Winner(s)': string;
}

export async function fetchSeasonsData(): Promise<JetLagSeason[]> {
	const seasonsTable: TableRow[] = await fetch('https://www.wikitable2json.com/api/Jet_Lag:_The_Game' +
		'?table=0' +
		'&keyRows=2' +
		'&brNewLine=true',
	)
		.then(response => response.json())
		.then(json => {
			if (!json || json.length === 0) {
				return undefined;
			}
			return json[0];
		});

	if (!seasonsTable) {
		throw new Error('Couldn\'t find seasons table');
	}

	return seasonsTable!
		.filter(row => !values(row).some(cell => cell.includes('TBA'))) // Filter out unfinished seasons
		.map(row => ({
			seasonNumber: Number(row.Season),
			seasonName: row.Title.replace(/\[[a-z]]$/g, ''),
			winners: parseGuests(row['Winner(s)']),
			players: [...MAIN_PLAYERS, ...parseGuests(row['Guest(s)'])],
		}))
		.sort((a, b) => a.seasonNumber - b.seasonNumber);
}

// Split on ', ' and ', & ', ' & ', and '\n'
function parseGuests(guests: string): string[] {
	if (guests === '—') {
		return [];
	}

	return guests
		.split(/, & | & |, |\n/)
		.map(name => name.trim());
}
